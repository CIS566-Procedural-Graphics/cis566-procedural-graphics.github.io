import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

import type { AppProps /*, AppContext */ } from 'next/app';

function App({ Component, pageProps }: AppProps): React.ReactElement {
  return <Component {...pageProps} />;
}

export default App;
