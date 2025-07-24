import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import NFTDetail from './pages/NFTDetail';
import Profile from './pages/Profile';

// Import wallet adapter CSS
import '@solana/wallet-adapter-react-ui/styles.css';
import { Create } from './pages/Create';

const App: React.FC = () => {
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = clusterApiUrl(network);
  
  const wallets = [
    new PhantomWalletAdapter(),
    new SolflareWalletAdapter(),
  ];

  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <ThemeProvider>
            <Router>
              <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 dark:from-[#0B0B0B] dark:via-[#1F1F1F] dark:to-[#0B0B0B] transition-all duration-300">
                <Navbar />
                <main className="pt-20">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/nft/:id" element={<NFTDetail />} />
                    <Route path="/profile/:address" element={<Profile />} />
                  </Routes>
                </main>
                <Footer />
                <Toaster
                  position="bottom-right"
                  toastOptions={{
                    style: {
                      background: 'rgba(31, 31, 31, 0.9)',
                      color: '#fff',
                      border: '1px solid rgba(153, 69, 255, 0.3)',
                      backdropFilter: 'blur(10px)',
                    },
                  }}
                />
              </div>
            </Router>
          </ThemeProvider>
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};

export default App;