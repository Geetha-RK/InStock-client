import { useEffect } from "react";
import { useNavigate } from "../../hooks/useNavigate";

function Navigate({ to, options }) {
	const navigate = useNavigate();
	useEffect(() => navigate(to, options));
	return <></>;
}

export default Navigate;
