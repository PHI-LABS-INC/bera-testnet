import { Address, Chain } from 'viem';

type BaseCredConfig = {
  title: string;
  requirement: string;
  credType: 'BASIC' | 'ADVANCED';
  network: Chain['id'];
  project: string;
  tags: string[];
  relatedLinks: string[];
  verificationSource: string;
  buyShareRoyalty: number;
  sellShareRoyalty: number;
  quantity: number;
};

export type TxFilterFunction = (
  tx: GeneralTxItem,
  contractAddresses: (Address | 'any')[],
  methodIds: (string | 'any')[],
) => boolean;

export type SignatureCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'etherscan' | 'contractCall' | 'balanceCheck' | 'nftbalance';
  apiKeyOrUrl: string;
  from?: Address;
  contractAddress: Address | Address[] | 'any';
  methodId: string | string[] | 'any';
  startBlock: string;
  endBlock: string;
  filterFunction: TxFilterFunction;
  mintEligibility: (result: number) => boolean;
  transactionCountCondition: (txs: any[], address: string) => number;
};

export type ContractCallCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'contractCall';
  apiKeyOrUrl: string;
  contractAddress: Address;
  functionName: string;
  abi: any[];
  contractCallCondition: (result: any) => boolean;
  args: (address: Address) => Promise<any[]>;
};

export type BalanceCheckCredConfig = BaseCredConfig & {
  verificationType: 'SIGNATURE';
  apiChoice: 'balanceCheck' | 'nftbalance';
  apiKeyOrUrl: string;
  contractAddress: Address | Address[];
  checkCondition: (result: any) => boolean;
};

export type MerkleCredConfig = BaseCredConfig & {
  verificationType: 'MERKLE';
  fileName: string;
};

export type CredConfig = SignatureCredConfig | MerkleCredConfig | ContractCallCredConfig | BalanceCheckCredConfig;
export type CredResult = [boolean, string];

export type EtherscanFilter = (a: EtherscanTxItem) => boolean;

export type GeneralTxItem = {
  hash: string;
  from: string;
  to: string;
  blockNumber: string;
  methodId?: string; // For Etherscan's transaction data
  isError?: string; // This might be specific to Etherscan
  input?: string; // For Alchemy's transaction data
};

export type EtherscanTxItem = {
  blockNumber: string;
  timeStamp: string;
  hash: string;
  nonce: string;
  blockHash: string;
  transactionIndex: string;
  from: string;
  to: string;
  value: string;
  gas: string;
  gasPrice: string;
  isError: string;
  txreceipt_status: string;
  input: string;
  contractAddress: string;
  cumulativeGasUsed: string;
  gasUsed: string;
  confirmations: string;
  methodId: string;
  functionName: string;
};

export type EtherscanResponse = {
  status: string;
  message: string;
  result: EtherscanTxItem[];
};

export type BaseArtSetting = {
  name: string;
  description: string;
  tags: string[];
  externalURL: string;
  price: number;
  maxSupply?: number;
  soulbound: boolean;
  startDate: number;
  endDate: number;
  artist: Address;
  receiver: Address;
};

export type ImageArtSetting = BaseArtSetting & {
  artType: 'IMAGE';
  imagePath: string;
};

export type ApiArtSetting = BaseArtSetting & {
  artType: 'API_ENDPOINT';
  endpoint: string;
  previewInput: { address: Address; data?: string };
};

export type UpdateArtRequest = {
  name?: string;
  description?: string;
  imagePath: string;
  tags?: string[];
  receiver: Address;
  maxSupply: number | bigint;
  price: number;
  start: number;
  end: number;
  royaltyBPS: number;
  royaltyRecipient: Address;
};

export type ArtSetting = ImageArtSetting | ApiArtSetting;

export type VerifySetting = {
  credId: number;
  endpoint: string;
  address: Address;
  verificationSource: string;
};
