import React, {useState} from "react";
import {Auth, API} from "aws-amplify";
import Amplify from "aws-amplify";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

const apiName = "WildRydesAPI";

function HelloWorld(props) {

    const [response, setResponse] = useState("Not Request");


    const postNoAuth = async () => {
        Amplify.Logger.LOG_LEVEL = "DEBUG";
        const apiRequest = {
            body: {},
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await API.post(apiName, "/no_auth", apiRequest);
    };
    const onClick_no_auth = async () => {
        setResponse('')
        let resp = await postNoAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };

    const postIAMAuth = async () => {
        Amplify.Logger.LOG_LEVEL = "DEBUG";
        const apiRequest = {
            body: {},
            headers: {
                "Content-Type": "application/json",
            },
        };
        return await API.post(apiName, "/iam_auth", apiRequest);
    };
    const onClick_iam_auth = async () => {
        setResponse('')
        let resp = await postIAMAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };
    const postCogAuth = async () => {
        const session = await Auth.currentSession();
        Amplify.Logger.LOG_LEVEL = "DEBUG";
        const apiRequest = {
            body: {},
            headers: {
                "Content-Type": "application/json",
                "Authorization":  session.getIdToken().getJwtToken()
            },
        };
        return await API.post(apiName, "/cog_auth", apiRequest);
    };
    const onClick_cog_auth = async () => {
        setResponse('')
        let resp = await postCogAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };

    const divStyle = {
        color: "#FFF",
        background: "#000",
        padding: "2.5rem 0",
        textAlign: "center",
    };
    const RespStyle = {

    };
    return (
        <div>
            <SiteNav/>
            <div style={divStyle} className="row column">
                <button onClick={onClick_no_auth}>postNoAuth</button>
                <button onClick={onClick_iam_auth}>postIAMAuth</button>
                <button onClick={onClick_cog_auth}>postCogAuth</button>
            </div>
            <pre style={RespStyle}>{response}</pre>
            <SiteFooter/>
        </div>
    );
}

export default HelloWorld;
