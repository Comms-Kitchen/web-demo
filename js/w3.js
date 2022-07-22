console.log('w3.js is ready');

/* Moralis init code */
const serverUrl = "https://0gv9cte6ffgc.usemoralis.com:2053/server";
const appId = "1cwSKRKtBADeBuwCVYWJFAQElMixb7AMMIZxhLHe";
Moralis.start({ serverUrl, appId });



function loginCheck() {
    let user = Moralis.User.current();
    if (!user) {
        $('#address').text("🥸");
        $('#btn-login').show(); 
        $('#btn-logout').hide(); 
    }
}

loginCheck();

/* Authentication code */
async function login() {
  let user = Moralis.User.current();
  if (!user) {
    
    user = await Moralis.authenticate({
        provider: "web3Auth",
        clientId: "BCCoTaZeExT3pdixtBCMlWXOYCkG5bmYfgeZZm7r7dtl-Ltjb-2E2LlMHDwuoQ81JkK8azBeMIGFhGvVIHfWh8I",
        appLogo: "/static/assets/logo.svg",
        theme: "light",
        loginMethodsOrder: ["google", "apple", "twitter", "github", "wechat"],
    })
      .then(function (user) {
        console.log("logged in user:", user);
        console.log(user.get("ethAddress"));
        $('#address').text(user.get("ethAddress"));
        $('#btn-login').hide();
        $('#btn-logout').show();
      })
      .catch(function (error) {
        console.log(error);
        window.location.replace("/");
      });
  }
}

async function logOut() {
  await Moralis.User.logOut();
  console.log("logged out");
  $('#address').text("🥸");
  $('#btn-login').show(); 
  $('#btn-logout').hide(); 
  window.location.replace("/");
}

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;


// const { Web3Auth } = require("@web3auth/web3auth");
// const Web3 = require("web3");

// const web3auth = new Web3Auth({
//   clientId: "BCCoTaZeExT3pdixtBCMlWXOYCkG5bmYfgeZZm7r7dtl-Ltjb-2E2LlMHDwuoQ81JkK8azBeMIGFhGvVIHfWh8I", // get it from Web3Auth Dashboard
//   chainConfig: {
//     chainNamespace: "eip155",
//     chainId: "0x3", // ropsten, hex of 3
//   },
// });

// await web3auth.initModal();

// const web3authProvider = web3auth.connect();

// const web3 = new Web3(web3authProvider);

// const web3authSdk = window.Web3auth;
// let web3AuthInstance = null;

// (async function init() {
//   $(".btn-logged-in").hide();
//   $("#sign-tx").hide();

// //   web3AuthInstance = new web3authSdk.Web3Auth({
// //     chainConfig: { chainNamespace: "eip155" },
// //     clientId: "BCCoTaZeExT3pdixtBCMlWXOYCkG5bmYfgeZZm7r7dtl-Ltjb-2E2LlMHDwuoQ81JkK8azBeMIGFhGvVIHfWh8I", // get your clientId from https://developer.web3auth.io
// //   });

//   subscribeAuthEvents(web3AuthInstance);

//   await web3AuthInstance.initModal();
//   console.log("web3AuthInstance", web3AuthInstance, web3AuthInstance.provider);
//   if (web3AuthInstance.provider) {
//     $(".btn-logged-in").show();
//     $(".btn-logged-out").hide();
//     if (web3AuthInstance.connectedAdapterName === "openlogin") {
//       $("#sign-tx").show();
//     }
//   } else {
//     $(".btn-logged-out").show();
//     $(".btn-logged-in").hide();
//   }
// })();

// function subscribeAuthEvents(web3auth) {
//   web3auth.on("connected", (data) => {
//     console.log("Yeah!, you are successfully logged in", data);
//   });

//   web3auth.on("connecting", () => {
//     console.log("connecting");
//   });

//   web3auth.on("disconnected", () => {
//     console.log("disconnected");
//   });

//   web3auth.on("errored", (error) => {
//     console.log("some error or user have cancelled login request", error);
//   });

//   web3auth.on("MODAL_VISIBILITY", (isVisible) => {
//     console.log("modal visibility", isVisible);
//   });
// }

// $("#login").click(async function (event) {
//     console.log("login");
//   try {
//     const provider = await web3AuthInstance.connect();
//     console.log("provider after login", provider);
//     $(".btn-logged-out").hide();
//     $(".btn-logged-in").show();
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#logout").click(async function (event) {
//   try {
//     await web3AuthInstance.logout();
//     $(".btn-logged-in").hide();
//     $(".btn-logged-out").show();
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#get-user-info").click(async function (event) {
//   try {
//     const user = await web3AuthInstance.getUserInfo();
//     $("#code").text(JSON.stringify(user || {}, null, 2));
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#get-accounts").click(async function (event) {
//   try {
//     const web3 = new Web3(web3AuthInstance.provider);
//     const accounts = await web3.eth.getAccounts();
//     $("#code").text(JSON.stringify(["Eth accounts", accounts], null, 2));
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#get-balance").click(async function (event) {
//   try {
//     const web3 = new Web3(web3AuthInstance.provider);
//     const accounts = await web3.eth.getAccounts();
//     const balance = await web3.eth.getBalance(accounts[0]);
//     $("#code").text(JSON.stringify(["Eth balance", balance], null, 2));
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#sign-message").click(async function (event) {
//   try {
//     const provider = web3AuthInstance.provider;
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();
//     const message = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
//     web3.currentProvider?.send(
//       {
//         method: "eth_sign",
//         params: [accounts[0], message],
//         from: accounts[0],
//       },
//       (err, result) => {
//         if (err) {
//           return console.error(err);
//         }
//         $("#code").text(JSON.stringify(["Eth sign message => true", result], null, 2));
//       }
//     );
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#sign-tx").click(async function (event) {
//   try {
//     const provider = web3AuthInstance.provider;
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();
//     const txRes = await web3.eth.signTransaction({
//       from: accounts[0],
//       to: accounts[0],
//       value: web3.utils.toWei("0.01"),
//     });
//     $("#code").text(JSON.stringify(txRes));
//   } catch (error) {
//     console.error(error.message);
//   }
// });

// $("#send-tx").click(async function (event) {
//   try {
//     const provider = web3AuthInstance.provider;
//     const web3 = new Web3(provider);
//     const accounts = await web3.eth.getAccounts();

//     const message = "0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad";
//     const txRes = await web3.eth.sendTransaction({
//       from: accounts[0],
//       to: accounts[0],
//       value: web3.utils.toWei("0.01"),
//     });
//     $("#code").text(JSON.stringify(txRes));
//   } catch (error) {
//     console.error(error.message);
//   }
// });