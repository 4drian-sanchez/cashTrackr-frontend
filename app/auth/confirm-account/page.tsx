"use client"
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { toast } from "react-toastify";
import { PinInput, PinInputField } from "@chakra-ui/pin-input";
import confirmAccount from "@/actions/confirm-account-action";
import { useRouter } from "next/navigation";

export default function ConfirmAccountPage() {

  const router = useRouter()

  const [isComplete, setIsComplete] = useState(false);
  const [token, setToken] = useState('')  
  //Pasar argumentos adicionales a los server actions
  const confirmAccountWithToken = confirmAccount.bind(null, token)
  const [state, dispatch] = useFormState(confirmAccountWithToken, {
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
      state.errors.forEach( error => {
        toast.error(error)
      })
    }
    
    if(state.success) {
      toast.success(state.success, {
        onClose: () =>  router.push('/auth/login')
      })
    }
    
  }, [state]);
  

  const handleChange = (value : string) => {
    setIsComplete(false)
    setToken(value)
  }
  
  const handleComplete = () => {
    setIsComplete(true)
  }

  
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">Confirma tu cuenta</h1>
      <p className="text-3xl font-bold">
        Ingresa el código que recibiste <span className="text-amber-500">por email</span>
      </p>

      <div className="flex justify-center gap-5 mt-10">
        <PinInput
          value={token}
          onChange={handleChange}
          onComplete={handleComplete}
        >
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
          <PinInputField className="border border-gray-300 w-10 h-10 rounded-md placeholder-white text-center "/>
        </PinInput>

      </div>
    </>
  );
};