"use client"
import ResetPasswordForm from "./ResetPasswordForm";
import ValidateTokenForm from "./ValidateTokenForm";

import { useState } from "react";

export default function PasswordResetHandler() {
    const [token, setToken] = useState('');
    const [isValidateToken, setIsValidateToken] = useState(false);
  return (
    <>
    {
        isValidateToken ? (
            <ResetPasswordForm
              token ={token}
            />
            
        )
        : (
            <ValidateTokenForm 
              setIsValidateToken={setIsValidateToken}
              token={token}
              setToken={setToken}
              />
        )
    }
    </>
  );
};