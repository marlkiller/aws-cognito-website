/*
 *   Copyright 2018 Amazon.com, Inc. or its affiliates. All Rights Reserved.

 *  Licensed under the Apache License, Version 2.0 (the "License").
 *  You may not use this file except in compliance with the License.
 *  A copy of the License is located at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  or in the "license" file accompanying this file. This file is distributed
 *  on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 *  express or implied. See the License for the specific language governing
 *  permissions and limitations under the License.
 */
import React from "react";
import { Link } from "react-router-dom";
import SiteNav from "../components/SiteNav";
import SiteFooter from "../components/SiteFooter";

import "../css/main.css";

//<Link className="home-button" to="/app">
const Home = () => {
  return (
    <div className="page-home">
      <header className="site-header">
        <h1 className="title">home page</h1>
        <SiteNav />
          <Link className="home-button" to="/profile">
          Go profile
        </Link>
      </header>
      <SiteFooter />
    </div>
  );
};

export default Home;
