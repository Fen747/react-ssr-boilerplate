import Loadable from "react-loadable";
import React from "react";

const DynamicImporter = func => Loadable({
    loading: () =>	<div>Loading...</div>,
    loader: func,
});

export default DynamicImporter;