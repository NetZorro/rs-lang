import { baseURL } from "constants/baseURL";
import { IUserReg, IUserAuth } from "interfaces/IAuthorization";

export const authorization = {
  async userAuth(user: IUserAuth, dispatch: any) {
    let result;
    try {
      console.log(user);
      result = await fetch(`${baseURL}signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      if (result.status === 200) {
        let reply: Promise<JSON> = await result.json();
        await dispatch(loginUser(reply));
        await dispatch({ type: "user__logIn" });
        sessionStorage.setItem("user", JSON.stringify(reply));
        return true;
      } else {
        return false;
      }
    } catch (error) {
      result = error;
    }
  },
  async userReg(user: IUserReg) {
    let result;
    try {
      result = await fetch(`${baseURL}users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(user),
      });
      if (result.status > 400) {
        return "Направильный адрес электорнной почты";
      } else {
        console.log("okey");
        return "Все окей вы зарегистрированы";
      }
    } catch (error) {
      console.log("Error Register", error);
      result = error;
    }
  },
};

const loginUser = (userObj: Object) => ({
  type: "user__authorization",
  payload: userObj,
});
