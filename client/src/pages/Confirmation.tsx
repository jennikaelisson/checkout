// Här hämtas senaste session ut för att visa saker som ordernummer osv och spara det i localStorage. kodades upp 4 april kanske

import { useEffect, useState } from "react";

const Confirmation = () => {
    const [verified, setVerified] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!verified) {
            console.log("nu körs jag!");
            const verifySession = async () => {
                console.log("och jag går in i funktionen");
                let sessionId;
                const dataFromLS = localStorage.getItem("sessionId");
                console.log(dataFromLS);
                

                if (dataFromLS) {
                    sessionId = JSON.parse(dataFromLS);
                    console.log(sessionId)
                }
                
                const response = await fetch("http://localhost:3001/payments/verify-session", {
                method: "POST",    
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ sessionId })
                })
                console.log(response);
                
                const data = await response.json();
                console.log(data);
                

                if (response.ok) {
                    setVerified(data.verified)
                    setIsLoading(false)
                }
            }
            verifySession()
        }
    }, [verified])


    return <>
    {verified && !isLoading ? "Tack för ditt köp" : "Laddar..."}</>
}

export default Confirmation;