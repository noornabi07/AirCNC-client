import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

import {
  RouterProvider,
} from "react-router-dom";
import router from './Routes/routes.jsx';
import AuthProvider from './Provider/AuthProvider.jsx';

import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router}></RouterProvider>
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>,
)
