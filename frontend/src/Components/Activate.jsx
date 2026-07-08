import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function Activate() {
    const { token } = useParams();
    const [status, setStatus] = useState("Verifying...");

    useEffect(() => {
        const verify = async () => {
            try {
                const { data } = await axios.get(
                    `${process.env.REACT_APP_BACKEND_URL}/activate/${token}`
                );
                setStatus(data.message);
            } catch (err) {
                setStatus(
                    err.response?.data?.message || "Activation failed"
                );
            }
        };

        verify();
    }, [token]);

    return <h2>{status}</h2>;
}