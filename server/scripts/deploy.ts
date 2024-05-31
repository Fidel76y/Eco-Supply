import { ethers } from 'hardhat';

async function main() {
  const supplyChain = await ethers.deployContract('SupplyChain');

  await supplyChain.waitForDeployment();

  // console.log(supplyChain)

  console.log('Contract Deployed at ' + supplyChain.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

// CA: 0xbb9bd6f334a97cCb0B26a8f07c785A4731E4498F