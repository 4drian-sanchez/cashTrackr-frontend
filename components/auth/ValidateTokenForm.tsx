import validateToken from "@/actions/validate-token-action";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";

type ValidateTokenFormTypes = {
  setIsValidateToken: Dispatch<SetStateAction<boolean>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

export default function ValidateTokenForm({setIsValidateToken, token, setToken} : ValidateTokenFormTypes) {

  const [isComplete, SetIsComplete] = useState(false);
  const validateWithToken = validateToken.bind(null, token)
  const [state, dispatch] = useFormState(validateWithToken, {
    errors: [],
    success: ''
  })

  useEffect(() => {
      if(isComplete) {
        dispatch()
      }
  }, [isComplete]);

  useEffect(() => {
    if(state.errors.length) {
      state.errors.forEach( error => toast.error(error))
    }

    if(state.success) {
      toast.success(state.success)
      setIsValidateToken(true)
    }
  
  }, [state]);

  const handleChange = (token: string) => {
    SetIsComplete(false)
    setToken(token)
  }

  const handleComplete = () => {
      SetIsComplete(true)
  }

  return (
    <div className="flex justify-center gap-5 my-10">
      <PinInput
        value={token}
        onChange={handleChange}
        onComplete={handleComplete}
      >
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
        <PinInputField className="h-10 w-10 text-center border border-gray-300 shadow rounded-lg placeholder-white" />
      </PinInput>
    </div>
  )
}