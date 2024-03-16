import hre from 'hardhat';
const { ethers } = hre;

async function main() {
  const [deployer] = await ethers.getSigners();

  console.log('Deploying contracts with the account', deployer.address);
  const DegenContract = await ethers.getContractFactory('DegenContract');
  const deployed = await DegenContract.deploy();

  console.log(deployed); // Add this line

  await deployed.deployed();

  console.log('PersonsContract deployed to:', deployed.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
