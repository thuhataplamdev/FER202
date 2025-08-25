import React, { createContext, useContext, useReducer, useMemo } from 'react';

const FavouritesContext = createContext();

// Favourites reducer for managing favourites state
const favouritesReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_FAVOURITES':
      if (state.items.find(item => item.id === action.payload.id)) {
        return state;
      }
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_FROM_FAVOURITES':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case 'CLEAR_FAVOURITES':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error('useFavourites must be used within a FavouritesProvider');
  }
  return context;
};

export const FavouritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favouritesReducer, {
    items: []
  });

  // Memoized favourites calculations
  const favouritesStats = useMemo(() => {
    return {
      totalItems: state.items.length
    };
  }, [state.items]);

  const addToFavourites = (product) => {
    dispatch({ type: 'ADD_TO_FAVOURITES', payload: product });
  };

  const removeFromFavourites = (productId) => {
    dispatch({ type: 'REMOVE_FROM_FAVOURITES', payload: productId });
  };

  const clearFavourites = () => {
    dispatch({ type: 'CLEAR_FAVOURITES' });
  };

  const isInFavourites = (productId) => {
    return state.items.some(item => item.id === productId);
  };

  const value = {
    items: state.items,
    totalItems: favouritesStats.totalItems,
    addToFavourites,
    removeFromFavourites,
    clearFavourites,
    isInFavourites
  };

  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}; 