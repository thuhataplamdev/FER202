import React, { useCallback, useEffect, useMemo, useReducer, useState } from "react";
import PropTypes from "prop-types";
import { Modal, Nav, ProgressBar, Toast, ToastContainer, Card } from "react-bootstrap";
import AboutForm from "./AboutForm";
import AccountForm from "./AccountForm";
import AddressForm from "./AddressForm";

const initialState = { // initial state for the profile wizard
  about: { fullName: "", email: "", age: "", avatar: null, avatarUrl: "" },
  account: { username: "", password: "", confirm: "", question: "", answer: "", showPwd: false },
  address: { streetName: "", streetNumber: "", city: "", country: "Viet Nam" },
  step: 0,  
  validated: { about: false, account: false, address: false }
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.scope]: { ...state[action.scope], [action.field]: action.value } };
    case "SET_AVATAR":
      return { ...state, about: { ...state.about, avatar: action.file, avatarUrl: action.url } };
    case "TOGGLE_SHOWPWD":
      return { ...state, account: { ...state.account, showPwd: !state.account.showPwd } };
    case "SET_STEP":
      return { ...state, step: action.step };
    case "SET_VALIDATED":
      return { ...state, validated: { ...state.validated, [action.scope]: action.value } };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}


function ProfileWizardModal({ show, onClose }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [showToast, setShowToast] = useState(false);
  const step = state.step;

  const isStepValid = useMemo(() => {
    if (step === 0) {
      const { fullName, email, age } = state.about;
      return Boolean(fullName.trim())
        && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        && String(age).trim() !== "";
    } else if (step === 1) {
      const { username, password, confirm, question, answer } = state.account;
      const userOk = (username || "").length >= 6;
      const pwdOk = /^(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/.test(password || "");
      const confirmOk = password && password === confirm;
      const qaOk = Boolean(question) && Boolean((answer || "").trim());
      return userOk && pwdOk && confirmOk && qaOk;
    } else if (step === 2) {
      const { streetName, streetNumber, city, country } = state.address;
      return Boolean(streetName.trim()) && Boolean(streetNumber.trim())
          && Boolean(city.trim()) && Boolean(country);
    }
    return false;
  }, [step, state]);

  const progress = useMemo(() => Math.round((step / 3) * 100), [step]);

  const nextStep = useCallback(() => {
    if (step < 2 && isStepValid) {
      dispatch({ type: "SET_STEP", step: step + 1 });
    } else if (step === 2 && isStepValid) {
      setShowToast(true);               // submit
      dispatch({ type: "SET_STEP", step: 3 });
    }
  }, [step, isStepValid]);

  const prevStep = useCallback(() => {
    if (step > 0) dispatch({ type: "SET_STEP", step: step - 1 });
  }, [step]);

  const onFieldChange = useCallback((scope, field, value) => {
    if (scope === "about" && field === "avatarFile") {
      if (value) {
        const url = URL.createObjectURL(value);
        dispatch({ type: "SET_AVATAR", file: value, url });
      } else {
        dispatch({ type: "SET_AVATAR", file: null, url: "" });
      }
      return;
    }
    dispatch({ type: "SET_FIELD", scope, field, value });
  }, []);

  const onAboutChange   = useCallback((f, v) => onFieldChange("about", f, v), [onFieldChange]);
  const onAccountChange = useCallback((f, v) => onFieldChange("account", f, v), [onFieldChange]);
  const onAddressChange = useCallback((f, v) => onFieldChange("address", f, v), [onFieldChange]);

  const setAboutValid   = useCallback((ok) => dispatch({ type:"SET_VALIDATED", scope:"about", value:ok }), []);
  const setAccountValid = useCallback((ok) => dispatch({ type:"SET_VALIDATED", scope:"account", value:ok }), []);
  const setAddressValid = useCallback((ok) => dispatch({ type:"SET_VALIDATED", scope:"address", value:ok }), []);

  const toggleShowPwd = useCallback(() => dispatch({ type:"TOGGLE_SHOWPWD" }), []);

  const selectTab = useCallback((idx) => {
    if (idx > step && !isStepValid) return; // chặn nhảy khi chưa hợp lệ
    dispatch({ type:"SET_STEP", step: idx });
  }, [step, isStepValid]);

  const resetAll = useCallback(() => dispatch({ type:"RESET" }), []);
  const handleClose = useCallback(() => { resetAll(); onClose?.(); }, [onClose, resetAll]);

  useEffect(() => {
    return () => { if (state.about.avatarUrl) URL.revokeObjectURL(state.about.avatarUrl); };
  }, [state.about.avatarUrl]);

  return (
    <Modal show={show} onHide={handleClose} centered size="lg">
      <Modal.Header closeButton>
        <Modal.Title>BUILD YOUR PROFILE</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="mb-3"><ProgressBar now={progress} label={`${progress}%`} /></div>

        <Nav variant="tabs" activeKey={String(step)} onSelect={(k)=>selectTab(Number(k))} className="mb-3">
          <Nav.Item><Nav.Link eventKey="0">About</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="1" disabled={!(state.validated.about || step>0)}>Account</Nav.Link></Nav.Item>
          <Nav.Item><Nav.Link eventKey="2" disabled={!(state.validated.account || step>1)}>Address</Nav.Link></Nav.Item>
        </Nav>

        {step === 0 && (
          <AboutForm value={state.about} onChange={onAboutChange} onNext={nextStep} setValid={setAboutValid} />
        )}
        {step === 1 && (
          <AccountForm
            value={state.account}
            onChange={onAccountChange}
            onPrev={prevStep}
            onNext={nextStep}
            setValid={setAccountValid}
            toggleShowPwd={toggleShowPwd}
          />
        )}
        {step === 2 && (
          <AddressForm
            value={state.address}
            onChange={onAddressChange}
            onPrev={prevStep}
            onNext={nextStep}
            setValid={setAddressValid}
          />
        )}

        {step === 3 && (
          <div className="p-2">
            <Card className="shadow-sm">
              <Card.Header><strong>Your Profile</strong></Card.Header>
              <Card.Body>
                <div className="d-flex gap-3 align-items-start">
                  <div>
                    {state.about.avatarUrl
                      ? <img src={state.about.avatarUrl} alt="avatar" style={{width:100,height:100,borderRadius:16,objectFit:"cover"}} />
                      : <div style={{width:100,height:100,borderRadius:16,background:"#eee"}} />}
                    <div className="small text-muted mt-1">Avatar</div>
                  </div>
                  <div className="flex-grow-1">
                    <div className="mb-3">
                      <h6 className="mb-2">About</h6>
                      <div>Full name: <strong>{state.about.fullName}</strong></div>
                      <div>Email: <strong>{state.about.email}</strong></div>
                      <div>Age: <strong>{state.about.age}</strong></div>
                    </div>
                    <div className="mb-3">
                      <h6 className="mb-2">Account</h6>
                      <div>Username: <strong>{state.account.username}</strong></div>
                      <div>Question: <strong>{state.account.question}</strong></div>
                      <div>Answer: <strong>{state.account.answer}</strong></div>
                    </div>
                    <div>
                      <h6 className="mb-2">Address</h6>
                      <div>Street name: <strong>{state.address.streetName}</strong></div>
                      <div>Street number: <strong>{state.address.streetNumber}</strong></div>
                      <div>City: <strong>{state.address.city}</strong></div>
                      <div>Country: <strong>{state.address.country}</strong></div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </div>
        )}
      </Modal.Body>

      <ToastContainer position="top-end" className="p-3">
        <Toast onClose={()=>setShowToast(false)} show={showToast} bg="success" delay={3000} autohide>
          <Toast.Header closeButton={false}><strong className="me-auto">Success</strong></Toast.Header>
          <Toast.Body className="text-white">Submitted successfully!</Toast.Body>
        </Toast>
      </ToastContainer>
    </Modal>
  );
}

ProfileWizardModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default ProfileWizardModal;