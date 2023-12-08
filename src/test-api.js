import { API, Auth } from "aws-amplify";

// const testAuth = async () => {
//   const user = await Auth.currentAuthenticatedUser();
//   const token = user.signInUserSession.accessToken.jwtToken;
//   const apiName = "gotchooSwagBagAPI";
//   const path = "/swagbag";
//   const myInit = {
//     headers: {
//       Authorization: token,
//     },
//   };
//   const result = await API.get(apiName, path, myInit);
//   console.log(result);
// }

const testapi = async () => {
  const apiName = "gotchooSwagBagAPI";
  const mainPath = "/swagbag"
  const subPath = '/host';
  const path = mainPath + subPath;
  try {
    const result = await API.get(apiName, path, {});
    console.log(result);
  } catch (error) {
    console.log(error);
  }
}

export const TestApp = () => {
  return (
    <div>
      <button onClick={testapi}>Test API</button>
    </div>
  );
}