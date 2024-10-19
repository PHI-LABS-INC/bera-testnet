import 'dotenv/config';
import { txFilter_Any, txFilter_Contract, txFilter_Standard } from '../verifier/utils/routescan/filter';
import { CredConfig, EtherscanTxItem } from '../utils/types';
import { ENDPOINT, rpc } from '../config';
import { Address, createPublicClient, decodeAbiParameters, http } from 'viem';
import { bearNetworkChainTestnet } from 'viem/chains';

const baseSettings = {
  network: 80084,
  startBlock: '0', // eligible network for your cred
  endBlock: '99999999',
  buyShareRoyalty: 0, // buy share royalty 0%
  sellShareRoyalty: 50, // sell royalty 0.5%
  quantity: 1, // initial share quantity
  verificationSource: 'https://github.com/PHI-LABS-INC/bara-bArtio',
};

export const credConfig: { [key: number]: CredConfig } = {
  0: {
    ...baseSettings,
    title: 'Transact on Bara bArtio',
    requirement: 'Execute any transaction on Bara bArtio',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: 'any',
    methodId: 'any',
    filterFunction: txFilter_Any,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Bara',
    tags: ['Transaction'],
    relatedLinks: ['https://www.berachain.com/', 'https://bartio.faucet.berachain.com/'],
  },
  1: {
    ...baseSettings,
    title: 'BEX Dealer',
    requirement: 'Perform a token swap on BEX on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D',
    methodId: '0x0b2f6f3f',
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BEX',
    tags: ['DeFi'],
    relatedLinks: [
      'https://bartio.bex.berachain.com/swap',
      'https://bartio.beratrail.io/address/0x21e2C0AFd058A89FCf7caf3aEA3cB84Ae977B73D',
    ],
  },
  2: {
    ...baseSettings,
    title: 'BEND Supporter',
    requirement: 'Supply assets to BEND lending pool on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x30a3039675e5b5cbea49d9a5eacbc11f9199b86d',
    methodId: ['0x617ba037'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BEND',
    tags: ['DeFi', 'Lending'],
    relatedLinks: ['https://bartio.bend.berachain.com/dashboard/'],
  },
  3: {
    ...baseSettings,
    title: 'Verified Baranames',
    requirement: 'Baranames: Register a human-readable name for your wallet address',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xBB57539243c4D35265fBF4B2F17d67219200450F',
    methodId: ['0x3d30c7f6'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Baranames',
    tags: ['Bara'],
    relatedLinks: ['https://www.beranames.com/'],
  },
  4: {
    ...baseSettings,
    title: 'Ooga Booga Supporter',
    requirement: 'Perform a token swap on BEX on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xA954f73434D48df52040eC85b30209C53b560B6B',
    methodId: ['0xd46cadbc'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Ooga Booga',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://app.oogabooga.io/'],
  },
  5: {
    ...baseSettings,
    title: 'Kodiak Trader',
    requirement: 'Perform a token swap on Kodiak on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x496e305C03909ae382974cAcA4c580E1BF32afBE',
    methodId: ['0x5ae401dc'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Kodiak',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://app.kodiak.finance/#/swap?chain=berachain_bartio', 'https://x.com/KodiakFi'],
  },
  6: {
    ...baseSettings,
    title: 'Beraborrower',
    requirement: 'Perform a token borrow on Beraborrower on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x9F02e5740D06CaDbf8Dc26B3f082239dF75FDF3a',
    methodId: ['0xb0ab6e1d', '0x12d5ac7d'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Beraborrower',
    tags: ['DeFi', 'Lend', 'Borrow'],
    relatedLinks: ['https://magic.beraborrow.com/den/borrow/'],
  },
  7: {
    ...baseSettings,
    title: 'Meme swaper',
    requirement: 'Perform a token swap on memeswap on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x0B20f33433E15744dA867FD797DCf59b45abA658',
    methodId: ['0xb6f9de95'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'memeswap',
    tags: ['DeFi', 'Meme'],
    relatedLinks: ['https://memeswap.fi/'],
  },
  8: {
    ...baseSettings,
    title: 'Goldilocks swaper',
    requirement: 'Perform a token swap on memeswap on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xC94ecBfE16E337f6e606dcd86B8A5eaDbAe7A337',
    methodId: ['0xd6febde8'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Goldilocks',
    tags: ['DeFi', 'Swap'],
    relatedLinks: ['https://www.goldilocksdao.io/goldiswap/swap'],
  },
  9: {
    ...baseSettings,
    title: 'BGT Contributor',
    requirement: 'Claim BGT token on BGT stataion on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x1992b26E2617928966B4F8e8eeCF41C6e7A77010',
    methodId: ['0xc00007b0'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BGT stataion',
    tags: ['DeFi', 'BGT'],
    relatedLinks: ['https://bartio.station.berachain.com/'],
  },
  10: {
    ...baseSettings,
    title: 'BGT Staker',
    requirement: 'Stake iBGT token on infrared on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x1992b26E2617928966B4F8e8eeCF41C6e7A77010',
    methodId: ['0xa694fc3a'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'INFRARED',
    tags: ['DeFi', 'BGT'],
    relatedLinks: ['https://infrared.finance/iBGT'],
  },
  11: {
    ...baseSettings,
    title: 'BERPs Contributor',
    requirement: 'Create Position on BERPs on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xb3395EeeA7701E0037bBC6Ab52953C6fB0c3326c',
    methodId: ['0x48e73d82'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BERPs',
    tags: ['DeFi', 'BERPs'],
    relatedLinks: ['https://bartio.berps.berachain.com/'],
  },
  12: {
    ...baseSettings,
    title: 'JNKY Minter',
    requirement: 'Mint JNKT token on JUNKY URSAS on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xa0525273423537BC76825B4389F3bAeC1968f83F',
    methodId: ['0x26092b83'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'JUNKY URSAS',
    tags: ['DeFi', 'GameFi'],
    relatedLinks: ['https://betabersion.junkyursas.com/'],
  },
  13: {
    ...baseSettings,
    title: 'Deposit Honey to Beracana',
    requirement: 'Deposit Honey in Bera Bank on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xE5FAa69DEF26b3875381FCD653205C3DBf5e9234',
    methodId: ['0xb6b55f25'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Beracana',
    tags: ['DeFi', 'Lending'],
    relatedLinks: ['https://app.beracana.com/lend', 'https://x.com/beracana'],
  },
  14: {
    ...baseSettings,
    title: 'YEET Token Holder',
    requirement: 'Own at least one YEET Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'balanceCheck',
    apiKeyOrUrl: '',
    contractAddress: '0x1740F679325ef3686B2f574e392007A92e4BeD41',
    checkCondition: (result: number) => result > 0,
    project: 'YEET',
    tags: ['Token', 'YEET'],
    relatedLinks: [
      'https://bartio.beratrail.io/token/0x1740F679325ef3686B2f574e392007A92e4BeD41',
      'https://www.yeetit.xyz/',
    ],
  },
  15: {
    ...baseSettings,
    title: 'BEDROCK Player',
    requirement: 'Stake WBTC to mint uniBTC BEDROCK on Bartio Testnet',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'balanceCheck',
    apiKeyOrUrl: '',
    contractAddress: '0x16221CaD160b441db008eF6DA2d3d89a32A05859',
    checkCondition: (result: number) => result > 0,
    project: 'BEDROCK',
    tags: ['Token', 'BEDROCK'],
    relatedLinks: [
      'https://bartio.beratrail.io/token/0x16221CaD160b441db008eF6DA2d3d89a32A05859',
      'https://app.bedrock.technology/unibtc?network=bartio',
    ],
  },
  16: {
    ...baseSettings,
    title: 'Honey Comb Holder',
    requirement: 'Own at least one Honey Comb Token',
    credType: 'ADVANCED',
    network: 1,
    verificationType: 'SIGNATURE',
    apiChoice: 'nftbalance',
    apiKeyOrUrl: '',
    contractAddress: '0xCB0477d1Af5b8b05795D89D59F4667b59eAE9244',
    checkCondition: (result: number) => result > 0,
    project: 'Honey Jar',
    tags: ['Token', 'Honey Jar'],
    relatedLinks: [
      'https://opensea.io/collection/honey-comb-2',
      'https://www.0xhoneyjar.xyz/',
      'https://etherscan.io/address/0xcb0477d1af5b8b05795d89d59f4667b59eae9244',
    ],
  },
  17: {
    ...baseSettings,
    title: 'TheHoneyCast Holder',
    requirement: 'Own at least one theHoneyCast Token',
    credType: 'ADVANCED',
    network: 1,
    verificationType: 'SIGNATURE',
    apiChoice: 'nftbalance',
    apiKeyOrUrl: '',
    contractAddress: '0xD65F95A40B6DE26F6c390fCb8e3377D382FE678B',
    checkCondition: (result: number) => result > 0,
    project: 'TheHoneyCast',
    tags: ['Token', 'TheHoneyCast'],
    relatedLinks: [
      'https://linktr.ee/TheHoneyCast',
      'https://opensea.io/collection/thc-nft-2',
      'https://etherscan.io/address/0xD65F95A40B6DE26F6c390fCb8e3377D382FE678B',
    ],
  },
  18: {
    ...baseSettings,
    title: 'BeraMarket Trader',
    requirement: 'Create Offer on BeraMarket on Bara bArtio',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xb3395EeeA7701E0037bBC6Ab52953C6fB0c3326c',
    methodId: ['0x48e73d82'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BeraMarket',
    tags: ['NFT', 'BeraMarket'],
    relatedLinks: ['https://beta.beramarket.xyz/'],
  },
  19: {
    ...baseSettings,
    title: 'Beramonium Staker',
    requirement: 'Beramonium Staker on Beramonium on Ethereum Mainnet',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    network: 1,
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x46B4b78d1Cd660819C934e5456363A359fde43f4',
    methodId: ['0x2bdcfe72'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Beramonium',
    tags: ['NFT', 'Beramonium'],
    relatedLinks: ['https://gemhunters.beramonium.io/', 'https://opensea.io/collection/beramonium-chronicles-genesis'],
  },
  20: {
    ...baseSettings,
    title: 'Beradrome Staker',
    requirement: 'Stake on Beradrome',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x2B4141f98B8cD2a03F58bD722D4E8916d2106504',
    methodId: ['0xb6b55f25'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'Beradrome',
    tags: ['DeFi', 'Beradrome'],
    relatedLinks: ['https://beradrome-frontend-v1.vercel.app/'],
  },
  21: {
    ...baseSettings,
    title: 'BeraPoker Player',
    requirement: 'Deposit BOKER to BeraPoker',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x5004996E177367Fc54a3688E440024c8e288cBd9',
    methodId: ['0xe4ff9ed9'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BeraPoker',
    tags: ['GameFi', 'BeraPoker'],
    relatedLinks: ['https://app.berapoker.com/'],
  },
  22: {
    ...baseSettings,
    title: 'WeBera Finance Depositor',
    requirement: 'Deposit Honey to WeBera Finance',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x6d278e44575D573906D23A81850952bC4CDd8Efd',
    methodId: ['0x2e2d2984'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'WeBera Finance',
    tags: ['WeBera Finance'],
    relatedLinks: ['https://testnet.webera.finance/'],
  },
  23: {
    ...baseSettings,
    title: 'BGT MARKET Depositor',
    requirement: 'Deposit BGT to BGT MARKET',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x8894D7EE78251cD234A5DDC93a163B467505E3AD',
    methodId: ['0xf340fa01'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'BGT MARKET',
    tags: ['BGT,MARKET'],
    relatedLinks: ['https://app.bgt.market/', 'https://docs.bgt.market/'],
  },
  24: {
    ...baseSettings,
    title: 'Lend Honey to Timeswap',
    requirement: 'Lend Honey to Timeswap',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x781D29c3205C982395DD38F3a692773FEca3b2Bd',
    methodId: ['0x80699b79'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'TIMESWAP',
    tags: ['DeFi', 'Lending'],
    relatedLinks: ['https://app.timeswap.io/markets?chainId=80084'],
  },
  25: {
    ...baseSettings,
    title: 'POTLUCK CHEF',
    requirement: 'Become a POTLUCK CHEF and Preparing Your Feast',
    credType: 'BASIC',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x42A1B317281E770A92C237305a0E638196722082',
    methodId: ['0xccf1f603'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'POTLUCK',
    tags: ['POTLUCK', 'GameFi'],
    relatedLinks: ['https://bartio.potluck.fun/'],
  },
  26: {
    ...baseSettings,
    title: 'T-HPOT Token Holder',
    requirement: 'Own at least one T-HPOT Token',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'balanceCheck',
    apiKeyOrUrl: '',
    contractAddress: '0xfc5e3743E9FAC8BB60408797607352E24Db7d65E',
    checkCondition: (result: number) => result > 0,
    project: 'T-HPOT',
    tags: ['Token', 'T-HPOT'],
    relatedLinks: ['https://app.honeypotfinance.xyz/faucet'],
  },
  27: {
    ...baseSettings,
    title: 'Milabys 2 Holder',
    requirement: 'Own at least one Milabys 2 Token',
    credType: 'ADVANCED',
    network: 80084,
    verificationType: 'SIGNATURE',
    apiChoice: 'nftbalance',
    apiKeyOrUrl: '',
    contractAddress: '0xD0B9aC12bdF42ccF3A9f32777Ce5D0e43D482798',
    checkCondition: (result: number) => result > 0,
    project: 'Milabys',
    tags: ['Token', 'Milabys'],
    relatedLinks: [
      'https://beta.beramarket.xyz/collections/0xD0B9aC12bdF42ccF3A9f32777Ce5D0e43D482798',
      'https://bartio.beratrail.io/token/0xD0B9aC12bdF42ccF3A9f32777Ce5D0e43D482798',
    ],
  },
  28: {
    ...baseSettings,
    title: 'Beradelic',
    requirement: 'Own at least one Beradelic Token',
    credType: 'ADVANCED',
    network: 42161,
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0x89562210581f9c60b73de7a512801513e13708ee',
    functionName: 'balanceOf',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
      },
    ],
    contractCallCondition: (result: number) => result > 0,
    args: async (address: Address) => [address],
    project: 'BeraSig',
    tags: ['Token', 'BeraSig'],
    relatedLinks: [
      'https://opensea.io/collection/beradelic',
      'https://arbiscan.io/address/0x89562210581f9c60b73de7a512801513e13708ee',
    ],
  },
  29: {
    ...baseSettings,
    title: 'Beracer Brand Brix',
    requirement: 'Own at least one Beracer Brand Brix',
    credType: 'ADVANCED',
    network: 42161,
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0xA460540bb374013161e44CE5d7DDed8AFF8EFfE5',
    functionName: 'balanceOf',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
      },
    ],
    contractCallCondition: (result: number) => result > 0,
    args: async (address: Address) => [address],
    project: 'Beracer',
    tags: ['Token', 'Beracer'],
    relatedLinks: [
      'https://www.kingdomly.app/beracer-brand-brix-pass',
      'https://arbiscan.io/address/0xA460540bb374013161e44CE5d7DDed8AFF8EFfE5',
    ],
  },
  30: {
    ...baseSettings,
    title: 'Hungrybera',
    requirement: 'Own at least one Hungrybera Token',
    credType: 'ADVANCED',
    network: 42161,
    verificationType: 'SIGNATURE',
    apiChoice: 'contractCall',
    apiKeyOrUrl: '',
    contractAddress: '0xac59f7e7e5da0dc4f416a7aeff7a49ac284f10ca',
    functionName: 'balanceOf',
    abi: [
      {
        name: 'balanceOf',
        type: 'function',
        inputs: [
          {
            name: 'owner',
            type: 'address',
          },
        ],
        outputs: [
          {
            name: '',
            type: 'uint256',
          },
        ],
        stateMutability: 'view',
      },
    ],
    contractCallCondition: (result: number) => result > 0,
    args: async (address: Address) => [address],
    project: 'Ramen Finance',
    tags: ['Token', 'Hungrybera'],
    relatedLinks: [
      'https://ramenfinance.medium.com/ramenomics-a-deeper-look-at-community-incentives-tokenomics-abd9b0a24b08',
      'https://opensea.io/collection/Hungrybera',
      'https://arbiscan.io/address/0xac59f7e7e5da0dc4f416a7aeff7a49ac284f10ca',
    ],
  },
  31: {
    ...baseSettings,
    title: 'Berally Starter',
    requirement: 'Join Berally on Bara bArtio',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0x4536f5e298b650134c6444d8d9Ed9f75f7e15aEe',
    methodId: ['0x152f0dd4'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'berally',
    tags: ['Social', 'berally'],
    relatedLinks: ['https://berally.io/'],
  },
  32: {
    ...baseSettings,
    title: 'GOLD STAKER',
    requirement: 'Stake Gold on grandconquest on Bara bArtio',
    credType: 'ADVANCED',
    verificationType: 'SIGNATURE',
    apiChoice: 'etherscan',
    apiKeyOrUrl: process.env.ROUTESCAN_API_KEY ?? '',
    contractAddress: '0xB73a3533dD82dB2Be11cFdD10c8052F1d342cf56',
    methodId: ['0x47e7ef24'],
    filterFunction: txFilter_Standard,
    mintEligibility: (result: number) => result > 0,
    transactionCountCondition: (txs: any[], address: string) =>
      txs.filter((tx) => tx.from.toLowerCase() === address.toLowerCase()).length,
    project: 'GRAND CONQUEST',
    tags: ['GameFI', 'GRAND CONQUEST'],
    relatedLinks: ['https://www.grandconquest.com/#/'],
  },
};

export const credVerifyEndpoint: { [key: number]: string } = Object.fromEntries(
  Object.keys(credConfig).map((key) => [key, `https://${ENDPOINT}/api/verify/${key}`]),
);
