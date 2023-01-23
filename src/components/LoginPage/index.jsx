import React from "react";
import LoginImage from "./../../Assets/images/login-page.svg";
import Navbar from "../Navbar";
import "./index.css";

const LoginPage = () => {
  return (
    <div>
        <Navbar/>
      <div className="containers">
        <div className="login-img">
          <img src={LoginImage} alt="" />
        </div>
        <div className="login-content">
          <form className="user-login">
            <img src="data:image/svg+xml,%3csvg id='457bf273-24a3-4fd8-a857-e9b918267d6a' data-name='Layer 1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='698' height='698' viewBox='0 0 698 698'%3e%3cdefs%3e%3clinearGradient id='b247946c-c62f-4d08-994a-4c3d64e1e98f' x1='349' y1='698' x2='349' gradientUnits='userSpaceOnUse'%3e%3cstop offset='0' stop-color='gray' stop-opacity='0.25'/%3e%3cstop offset='0.54' stop-color='gray' stop-opacity='0.12'/%3e%3cstop offset='1' stop-color='gray' stop-opacity='0.1'/%3e%3c/linearGradient%3e%3c/defs%3e%3ctitle%3eprofile pic%3c/title%3e%3cg opacity='0.5'%3e%3ccircle cx='349' cy='349' r='349' fill='url(%23b247946c-c62f-4d08-994a-4c3d64e1e98f)'/%3e%3c/g%3e%3ccircle cx='349.68' cy='346.77' r='341.64' fill='%23f5f5f5'/%3e%3cpath d='M601%2c790.76a340%2c340%2c0%2c0%2c0%2c187.79-56.2c-12.59-68.8-60.5-72.72-60.5-72.72H464.09s-45.21%2c3.71-59.33%2c67A340.07%2c340.07%2c0%2c0%2c0%2c601%2c790.76Z' transform='translate(-251 -101)' fill='%2338d39f'/%3e%3ccircle cx='346.37' cy='339.57' r='164.9' fill='%23333'/%3e%3cpath d='M293.15%2c476.92H398.81a0%2c0%2c0%2c0%2c1%2c0%2c0v84.53A52.83%2c52.83%2c0%2c0%2c1%2c346%2c614.28h0a52.83%2c52.83%2c0%2c0%2c1-52.83-52.83V476.92a0%2c0%2c0%2c0%2c1%2c0%2c0Z' opacity='0.1'/%3e%3cpath d='M296.5%2c473h99a3.35%2c3.35%2c0%2c0%2c1%2c3.35%2c3.35v81.18A52.83%2c52.83%2c0%2c0%2c1%2c346%2c610.37h0a52.83%2c52.83%2c0%2c0%2c1-52.83-52.83V476.35A3.35%2c3.35%2c0%2c0%2c1%2c296.5%2c473Z' fill='%23fdb797'/%3e%3cpath d='M544.34%2c617.82a152.07%2c152.07%2c0%2c0%2c0%2c105.66.29v-13H544.34Z' transform='translate(-251 -101)' opacity='0.1'/%3e%3ccircle cx='346.37' cy='372.44' r='151.45' fill='%23fdb797'/%3e%3cpath d='M489.49%2c335.68S553.32%2c465.24%2c733.37%2c390l-41.92-65.73-74.31-26.67Z' transform='translate(-251 -101)' opacity='0.1'/%3e%3cpath d='M489.49%2c333.78s63.83%2c129.56%2c243.88%2c54.3l-41.92-65.73-74.31-26.67Z' transform='translate(-251 -101)' fill='%23333'/%3e%3cpath d='M488.93%2c325a87.49%2c87.49%2c0%2c0%2c1%2c21.69-35.27c29.79-29.45%2c78.63-35.66%2c103.68-69.24%2c6%2c9.32%2c1.36%2c23.65-9%2c27.65%2c24-.16%2c51.81-2.26%2c65.38-22a44.89%2c44.89%2c0%2c0%2c1-7.57%2c47.4c21.27%2c1%2c44%2c15.4%2c45.34%2c36.65.92%2c14.16-8%2c27.56-19.59%2c35.68s-25.71%2c11.85-39.56%2c14.9C608.86%2c369.7%2c462.54%2c407.07%2c488.93%2c325Z' transform='translate(-251 -101)' fill='%23333'/%3e%3cellipse cx='194.86' cy='372.3' rx='14.09' ry='26.42' fill='%23fdb797'/%3e%3cellipse cx='497.8' cy='372.3' rx='14.09' ry='26.42' fill='%23fdb797'/%3e%3c/svg%3e" />
            <h2 className="title">Log In</h2>
            <div className="input-div one">
              <div className="i">
                <i className="fas fa-user"></i>
              </div>
              <div className="div">
                <input type="text" className="input" placeholder="Username" required/>
              </div>
            </div>
            <div className="input-div pass">
              <div className="i">
                <i className="fas fa-lock"></i>
              </div>
              <div className="div">
                <input type="password" className="input" placeholder="Password" required/>
              </div>
            </div>
            <input type="submit" className="login-btn" value="Login" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
