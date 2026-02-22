import Server, { TransactionBuilder, Networks, Operation } from "@stellar/stellar-sdk"

export type CreateHuntResult = {
  txHash: string
}

// Soroban-friendly createHunt helper (testnet default).
// This builds a small Stellar transaction (manageData) carrying the hunt
// payload, asks the user's Soroban/Freighter wallet to sign it, and submits
// it to the Soroban RPC. Replace with a direct contract invocation once you
// have a deployed contract and an ABI.
export async function createHunt(
  creator: string,
  title: string,
  description: string,
  start_time: number,
  end_time: number
): Promise<CreateHuntResult> {
  if (typeof window === "undefined") throw new Error("Browser environment required")

  const RPC = process.env.NEXT_PUBLIC_SOROBAN_RPC_URL || "https://rpc.testnet.soroban.stellar.org"
  const server = new Server(RPC)

  const anyWin = window as any
  const wallet = anyWin.freighter || anyWin.soroban || anyWin.sorobanWallet
  if (!wallet) {
    throw new Error(
      "No Soroban-compatible wallet detected (install Freighter or Soroban Wallet)."
    )
  }

  // Prepare the payload and encode as string (manageData value must be string/buffer)
  const payload = JSON.stringify({ action: "create_hunt", creator, title, description, start_time, end_time })

  // Ask the wallet for the public key. Different wallets expose slightly
  // different APIs; we try common ones (Freighter, Soroban wallet adapter).
  let publicKey: string | undefined
  if (wallet.getPublicKey) {
    publicKey = await wallet.getPublicKey()
  } else if (wallet.request && typeof wallet.request === "function") {
    try {
      const resp = await wallet.request({ method: "getPublicKey" })
      publicKey = resp
    } catch (_) {
      // ignore
    }
  }

  if (!publicKey) {
    throw new Error("Unable to obtain public key from wallet; ensure you are connected.")
  }

  // Load account state
  const account = await server.getAccount(publicKey)

  // Use manageData to carry the payload. In production you'd call the
  // Soroban contract (invoke host function) — this is a minimal signing flow
  // that triggers the wallet and returns a tx hash on success.
  const key = `create_hunt:${Date.now()}`
  const op = Operation.manageData({ name: key, value: payload })

  const tx = new TransactionBuilder(account, {
    fee: "100",
    networkPassphrase: Networks.TESTNET,
  })
    .addOperation(op)
    .setTimeout(180)
    .build()

  // Wallet signing varies: Freighter provides signTransaction and returns
  // a signed XDR; some adapters expose signTransaction as well. We try
  // common methods and fall back to throwing an instructive error.
  let signedXdr: string | undefined
  if (wallet.signTransaction) {
    // Freighter-like API: signTransaction(txXdr, network)
    signedXdr = await wallet.signTransaction(tx.toXDR())
  } else if (wallet.request) {
    try {
      signedXdr = await wallet.request({ method: "signTransaction", params: { tx: tx.toXDR() } })
    } catch (_) {
      // continue to error
    }
  }

  if (!signedXdr) {
    throw new Error("Wallet does not support signing via the detected API; please use Freighter or Soroban Wallet.")
  }

  // Submit signed transaction XDR to RPC
  const res = await server.submitTransaction(signedXdr)
  if (!res || !res.hash) throw new Error("Transaction submission failed")

  return { txHash: res.hash }
}

export type PlayerScore = {
  walletAddress: string;
  name?: string;
  points: number;
}

// Currently returns mock data since there is no deployed contract ABI.
export async function get_hunt_leaderboard(hunt_id: number): Promise<PlayerScore[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    { walletAddress: "GDA1234567890ABCDEF1234567890ABCDEF1234567890ABCDEF1234", name: "JohnDoe", points: 9 },
    { walletAddress: "GDB2234567890ABCDEF1234567890ABCDEF1234567890ABCDEF2234", name: "TDH", points: 6 },
    { walletAddress: "GDC3234567890ABCDEF1234567890ABCDEF1234567890ABCDEF3234", name: "User904", points: 5 },
    { walletAddress: "GDD4234567890ABCDEF1234567890ABCDEF1234567890ABCDEF4234", points: 4 }, // No name, should truncate
    { walletAddress: "GDE5234567890ABCDEF1234567890ABCDEF1234567890ABCDEF5234", points: 3 }, // No name, should truncate 
    { walletAddress: "GDF6234567890ABCDEF1234567890ABCDEF1234567890ABCDEF6234", name: "Alice", points: 15 }, // Should be sorted to top
    { walletAddress: "GDG7234567890ABCDEF1234567890ABCDEF1234567890ABCDEF7234", points: 1 },
  ];
}
