import React from 'react';
import ClipLoader from "react-spinners/ClipLoader";

const Spinner = () => {
	return (
			<ClipLoader
				css={{
					width: "100px",
					height: "100px",
					marginLeft: "20%",
					marginTop: "400px"
				}}
				size={150}
				color={"#123abc"}
				loading
			/>
	)
};

export default React.memo(Spinner);