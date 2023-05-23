import { useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate'

const useAxiosFunction = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [controller, setController] = useState();
    const axiosPrivate = useAxiosPrivate()

    const axiosFetch = async (configObj, setFunction) => {
        const {
            axiosInstance = axiosPrivate,
            method = "get",
            url,
            requestConfig = {}
        } = configObj;

        try {
            setLoading(true);
            const ctrl = new AbortController();
            setController(ctrl);
            const res = await axiosInstance[method.toLowerCase()](url, {
                ...requestConfig,
                signal: ctrl.signal
            });
            setFunction(res.data);
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        console.log(controller)

        // useEffect cleanup function
        return () => controller && controller.abort();

    }, [controller]);

    return [error, loading, axiosFetch];
}

export default useAxiosFunction