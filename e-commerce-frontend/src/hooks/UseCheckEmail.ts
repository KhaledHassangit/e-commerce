import axios from "axios";
import { useState } from "react";


type TStates = "idle" | "checking" | "available" | "notAvailable" | "failed" ;


const useCheckEmailAvailability = () =>{
    const [emailAvailabilityStatus , setEmailAvailabilityStatus] = 
    useState<TStates>("idle")

    const [enteredEmail,setEnteredEmail] = useState<null|string>(null)

    const  checkEmailAvailability = async (email:string) =>{
        setEnteredEmail(email)
        setEmailAvailabilityStatus("checking")
        try{
            const response = await axios.get(`/users?email=${email}`)
            if (response.data.length > 0) {
                setEmailAvailabilityStatus("notAvailable");
            } else {
                setEmailAvailabilityStatus("available");
            }
        }catch(error){
            setEmailAvailabilityStatus("failed")
            console.error("Error checking email availability:", error);

        }
    }

    const resetCheckEmailAvailability = () => {
        setEmailAvailabilityStatus("idle")
        setEnteredEmail(null)
    }
    return {emailAvailabilityStatus,enteredEmail,checkEmailAvailability,resetCheckEmailAvailability}

}



export default useCheckEmailAvailability