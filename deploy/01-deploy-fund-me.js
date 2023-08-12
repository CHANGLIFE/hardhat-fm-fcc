//方法一
//hre表示harthat运行环境
// function deployFunc(hre) {
//   console.log("Hi!");
//   hre.getNamedAccount()
//   hre.deployments
// }
//deployFunc() 导出为"hardhat-deploy"默认的查找的函数
// module.exports.default = deployFunc;

const { network } = require("hardhat");
const {
  networkConfig,
  developmentChains,
} = require("../helper-hardhat-config");
//这2行与上一行代码相同
//const heplerConfig = require("../helper-hardhat-config");
//const networkConfig = heplerConfig.networkConfig;

const { verify } = require("../utils/verify");

//方法二
// module.exports = async (hre) => {
//   const { getNamedAccounts, deployments } = hre;
//   //hre.getNamedAccounts
//   //hre.deployments
// };
//js中语法糖写法
module.exports = async ({ getNamedAccounts, deployments }) => {
  //获取deploy、log函数
  const { deploy, log } = deployments;
  //获取合约部署者账户
  const { deployer } = await getNamedAccounts();
  const chainId = network.config.chainId;
  // if chainId is X use address Y
  // if chainId is Z use address A
  //const ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];

  let ethUsdPriceFeedAddress;
  if (developmentChains.includes(network.name)) {
    const ethUsdAggregator = await deployments.get("MockV3Aggregator");
    ethUsdPriceFeedAddress = ethUsdAggregator.address;
  } else {
    ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"];
  }

  log("----------------------------------------------------");
  log("Deploying FundMe and waiting for confirmations...");

  //sepolia 测试网 ETH/USD 交易对地址
  //const address = "0x694AA1769357215DE4FAC081bf1f309aDC325306";

  //if the contract doesn't exist , we deploy a minimal version of
  //for our local testing

  //well what happens when we want to change chains?
  // when going for localhost or hardhat nerwork we want to use a mock

  const args = [ethUsdPriceFeedAddress];
  //部署合约
  const fundMe = await deploy("FundMe", {
    from: deployer,
    args: args, // put price feed address
    log: true,
    waitConfirmations: network.config.blockConfirmations || 1,
  });
  // log(`FundMe deployed at ${fundMe.address}`);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    await verify(fundMe.address, args);
  }

  log("------------");
};
module.exports.tags = ["all", "fundMe"];
