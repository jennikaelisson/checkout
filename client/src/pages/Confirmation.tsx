// Här hämtas senaste session ut för att visa saker som ordernummer osv och spara det i localStorage. kodades upp 4 april kanske

import { useState } from "react";

const Confirmation = () => {
    const [verified, setVerified] = useState(false);
    const [loading, setLoading] = useState(true);
    return <>
    {verified && !loading ? "Tack för ditt köp" : "Laddar..."}</>
}

export default Confirmation;