import React, {useState} from "react";
import {Auth, API} from "aws-amplify";
import Amplify from "aws-amplify";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";
import axios from 'axios';
import {
    Signer
} from '@aws-amplify/core';
//const apiName = "WildRydesAPI";

function HelloWorld(props) {

    const [response, setResponse] = useState("Not Request");
    let endpoint = API._options.API.endpoints[0].endpoint
    let load_tips = 'Loading...'

    const postNoAuth = async () => {
        Amplify.Logger.LOG_LEVEL = "DEBUG";
        return await axios.post(endpoint + '/no_auth')
        .then(function (response) {
            console.log(response.data);
            return response.data
        })
        .catch(function (error) {
            return {'error':error.message}
        });
//        const apiRequest = {
//            body: {},
//            headers: {
//                "Content-Type": "application/json",
//            },
//        };
//        return await API.post(apiName, "/no_auth", apiRequest);
    };
    const onClick_no_auth = async () => {
        setResponse(load_tips)
        let resp = await postNoAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };

    const postIAMAuth = async () => {
        Amplify.Logger.LOG_LEVEL = "DEBUG";

        let currentCredentials = await Auth.currentUserCredentials();
        let req_body = {}
        //  doc: http://docs.aws.amazon.com/general/latest/gr/sigv4-add-signature-to-request.html
        let sign_resp = Signer.sign({
            'method':'POST',
            'url':endpoint + '/iam_auth',
            'headers':{ "Content-Type": "application/json",},
            'data': JSON.stringify(req_body)
        },{
            'access_key':currentCredentials.accessKeyId,
            'secret_key':currentCredentials.secretAccessKey,
            'session_token':currentCredentials.sessionToken
        },{
            'service':'execute-api',
            'region':'us-east-2',
        })
        return await axios.post(endpoint + '/iam_auth',req_body,{
            headers:sign_resp.headers
        }).then(function (response) {
            console.log(response.data);
            return response.data
        }).catch(function (error) {
            return {'error':error.message}
        });
//        const apiRequest = {
//            body: {},
//            headers: {
//                "Content-Type": "application/json",
//            },
//        };
//        return await API.post(apiName, "/iam_auth", apiRequest);
    };
    const onClick_iam_auth = async () => {
        setResponse(load_tips)
        let resp = await postIAMAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };

    const postLambdaAuth = async () => {
        var result = window.prompt("Authorization", "Allow");

        return await axios.post(endpoint + '/diy_auth',{},{
            headers:{
                "authorization":  result
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data
        }).catch(function (error) {
            return {'error':error.message}
        });
    };
    const onClick_lambda_auth = async () => {
        setResponse(load_tips)
        let resp = await postLambdaAuth();
        console.log(resp);
        setResponse(JSON.stringify(resp,null,2));
    };

    const postCogAuth = async () => {
        Amplify.Logger.LOG_LEVEL = "DEBUG";
        let session = null
        try {
            session = await Auth.currentSession();
        }catch (e) {
            console.error('no session ??',e);
        }
        return await axios.post(endpoint + '/cog_auth',{},{
            headers:{
                "Authorization":  session?session.getIdToken().getJwtToken():""
            }
        }).then(function (response) {
            console.log(response.data);
            return response.data
        }).catch(function (error) {
            return {'error':error.message}
        });
//        const apiRequest = {
//            body: {},
//            headers: {
//                "Content-Type": "application/json",
//                "Authorization":  session?session.getIdToken().getJwtToken():""
//            },
//        };
//        return await API.post(apiName, "/cog_auth", apiRequest);
    };
    const onClick_cog_auth = async () => {
        setResponse(load_tips)
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
                <button onClick={onClick_lambda_auth}>postLambdaAuth</button>
                <button onClick={onClick_iam_auth}>postIAMAuth</button>
                <button onClick={onClick_cog_auth}>postCogAuth</button>
            </div>
            <pre style={RespStyle}>{response}</pre>
            <SiteFooter/>
        </div>
    );
}

export default HelloWorld;
