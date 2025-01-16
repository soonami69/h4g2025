'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from "next-auth/react";
import { Box, Button, Typography, Card, CardContent, Grid2 } from '@mui/material';

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

const Gmail = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);

  // Load gapi and initialize
  useEffect(() => {
    if (!session) return;

    const initializeGapi = async () => {
      await gapi.client.init({
        apiKey: API_KEY,
        discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
      });

      gapi.client.setToken({ access_token: session.accessToken });
      setIsGapiLoaded(true);
    };

    if (window.gapi) {
      gapi.load('client', initializeGapi);
    }
  }, [session]);

  const fetchMessages = async () => {
    if (!isGapiLoaded) return;

    try {
      const response = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 15,
      });

      const messageDetails = await Promise.all(
        response.result.messages.map((msg) =>
          gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
          })
        )
      );

      setMessages(messageDetails.map((res) => res.result));
    } catch (error) {
      console.error('Error fetching Gmail messages:', error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(parseInt(timestamp));
    return date.toLocaleString();
  };

  return (
<div style={{ backgroundColor: '#FADADD', minHeight: '100vh', padding: '20px' }}>
<Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client')} />
      <Script src="https://accounts.google.com/gsi/client" />
      
      {session ? (
        <div className="align-content-center">
          {/* Poppins font */}
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />

          <Typography variant="h3" style={{ fontFamily: 'Poppins, sans-serif' }} gutterBottom color="black">
            Your Emails:
          </Typography>

          <Button 
            variant="contained" 
            color="secondary" 
            onClick={fetchMessages}
            style={{ marginBottom: '20px', alignContent: 'center' }}
          >
            Fetch Gmail Messages
          </Button>
          <Grid2 
            container 
            spacing={3} 
            justifyContent="center" 
            style={{ width: '80%', margin: '0 auto' }}
          >
            {messages.map((msg, index) => {
              const sender = msg.payload.headers.find((h) => h.name === 'From')?.value || "Unknown Sender";
              const subject = msg.payload.headers.find((h) => h.name === 'Subject')?.value || "No Subject";
              const receivedTime = formatDate(msg.internalDate);

              return (
                <Grid2 item xs={12} key={index} style={{ display: 'flex', justifyContent: 'center' }}>
                  <Card
                    sx={{
                      width: '1800px',
                      backgroundColor: '#f9f0f1',
                      transition: 'background-color 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: '#e6ddde',
                      },
                    }}
                  >
                    <CardContent>
                      <Box 
                        display="flex" 
                        alignItems="center" 
                        justifyContent="space-between" 
                        height="100%" 
                        width="100%"
                      >
                        {/* Sender Section */}
                        <Box 
                          sx={{ 
                            flex: '1 1 20%', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis' 
                          }}
                        >
                          <Typography variant="subtitle1" fontWeight="bold">
                            {sender}
                          </Typography>
                        </Box>

                        {/* Subject Section */}
                        <Box 
                          sx={{ 
                            flex: '2 1 40%', 
                            whiteSpace: 'nowrap', 
                            overflow: 'hidden', 
                            textOverflow: 'ellipsis', 
                            paddingLeft: '10px' 
                          }}
                        >
                          <Typography variant="body1">
                            {subject}
                          </Typography>
                        </Box>

                        {/* Buttons Section */}
                        <Box 
                          sx={{ 
                            flex: '1 1 20%', 
                            display: 'flex', 
                            justifyContent: 'flex-end', 
                            alignItems: 'center' 
                          }}
                        >
                          <a
                            href={`https://mail.google.com/mail/u/0/#inbox/${msg.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ textDecoration: 'none' }}
                          >
                            <Button
                              variant="outlined"
                              color="primary"
                              style={{ marginRight: '10px' }}
                            >
                              Open in Gmail
                            </Button>
                          </a>
                          <Button 
                            variant="contained" 
                            sx={{ 
                              backgroundColor: '#96b6e4', 
                              color: '#000', 
                              '&:hover': { backgroundColor: '#82ace3' } 
                            }}
                          >
                            Summarize
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </div>
      ) : (
        <Typography variant="h6" color="textSecondary">
          Please log in to access Gmail messages.
        </Typography>
      )}
    </div>
  );
};

export default Gmail;

// 'use client';

// import React, { useEffect, useState } from 'react';
// import Script from 'next/script';
// import { useSession } from "next-auth/react";
// import { Box, Button, Typography, Card, CardContent, Grid2 } from '@mui/material';

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const API_KEY = process.env.GOOGLE_API_KEY;
// const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

// const Gmail = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [isGapiLoaded, setIsGapiLoaded] = useState(false);

//   // Load gapi and initialize
//   useEffect(() => {
//     if (!session) return;

//     const initializeGapi = async () => {
//       await gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//       });

//       gapi.client.setToken({ access_token: session.accessToken });
//       setIsGapiLoaded(true);
//     };

//     if (window.gapi) {
//       gapi.load('client', initializeGapi);
//     }
//   }, [session]);

//   const fetchMessages = async () => {
//     if (!isGapiLoaded) return;

//     try {
//       const response = await gapi.client.gmail.users.messages.list({
//         userId: 'me',
//         maxResults: 15,
//       });

//       const messageDetails = await Promise.all(
//         response.result.messages.map((msg) =>
//           gapi.client.gmail.users.messages.get({
//             userId: 'me',
//             id: msg.id,
//           })
//         )
//       );

//       setMessages(messageDetails.map((res) => res.result));
//     } catch (error) {
//       console.error('Error fetching Gmail messages:', error);
//     }
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleString();
//   };

//   return (
//     <div style={{ backgroundColor: '#FADADD', minHeight: '100vh', padding: '20px' }}>
//       <Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client')} />
//       <Script src="https://accounts.google.com/gsi/client" />
      
//       {session ? (
//         <div>
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             onClick={fetchMessages}
//             style={{ marginBottom: '20px' }}
//           >
//             Fetch Gmail Messages
//           </Button>
//           <Grid2 
//             container 
//             spacing={3} 
//             justifyContent="center" 
//             alignItems="center" 
//             style={{ width: '80%', margin: '0 auto' }}
//           >
//             {messages.map((msg, index) => {
//               const sender = msg.payload.headers.find((h) => h.name === 'From')?.value;
//               const subject = msg.payload.headers.find((h) => h.name === 'Subject')?.value;
//               const receivedTime = formatDate(msg.internalDate);

//               return (
//                 <Grid2 key={index}>
//                   <Card
//                     sx={{
//                       width: '100%',
//                       maxWidth: '800px',
//                       height: '100px',
//                       backgroundColor: '#f9f0f1',
//                       transition: 'background-color 0.3s ease',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         backgroundColor: '#e6ddde',
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Box display="flex" justifyContent="space-between" alignItems="center" height="100%">
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight="bold">
//                             {sender}
//                           </Typography>
//                           <Typography variant="body1">{subject}</Typography>
//                         </Box>
//                         <Box>
//                           <a
//                             href={`https://mail.google.com/mail/u/0/#inbox/${msg.id}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ textDecoration: 'none' }}
//                           >
//                             <Button
//                               variant="outlined"
//                               color="primary"
//                               style={{ marginRight: '10px' }}
//                             >
//                               Open in Gmail
//                             </Button>
//                           </a>
//                           <Button 
//                             variant="contained" 
//                             sx={{ backgroundColor: '#96b6e4', color: '#000', '&:hover': { backgroundColor: '#82ace3' } }}
//                           >
//                             Summarize
//                           </Button>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid2>
//               );
//             })}
//           </Grid2>
//         </div>
//       ) : (
//         <Typography variant="h6" color="textSecondary">
//           Please log in to access Gmail messages.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default Gmail;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Script from 'next/script';
// import { useSession } from "next-auth/react";
// import { Box, Button, Typography, Card, CardContent, Grid2 } from '@mui/material';

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const API_KEY = process.env.GOOGLE_API_KEY;
// const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

// const Gmail = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [isGapiLoaded, setIsGapiLoaded] = useState(false);

//   // Load gapi and initialize
//   useEffect(() => {
//     if (!session) return;

//     const initializeGapi = async () => {
//       await gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//       });

//       gapi.client.setToken({ access_token: session.accessToken });
//       setIsGapiLoaded(true);
//     };

//     if (window.gapi) {
//       gapi.load('client', initializeGapi);
//     }
//   }, [session]);

//   const fetchMessages = async () => {
//     if (!isGapiLoaded) return;

//     try {
//       const response = await gapi.client.gmail.users.messages.list({
//         userId: 'me',
//         maxResults: 15,
//       });

//       const messageDetails = await Promise.all(
//         response.result.messages.map((msg) =>
//           gapi.client.gmail.users.messages.get({
//             userId: 'me',
//             id: msg.id,
//           })
//         )
//       );

//       setMessages(messageDetails.map((res) => res.result));
//     } catch (error) {
//       console.error('Error fetching Gmail messages:', error);
//     }
//   };

//   const formatDate = (timestamp) => {
//     const date = new Date(parseInt(timestamp));
//     return date.toLocaleString();
//   };

//   return (
//     <div style={{ backgroundColor: '#FADADD', minHeight: '100vh', padding: '20px' }}>
//       <Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client')} />
//       <Script src="https://accounts.google.com/gsi/client" />
      
//       {session ? (
//         <div>
//           <Button 
//             variant="contained" 
//             color="secondary" 
//             onClick={fetchMessages}
//             style={{ marginBottom: '20px' }}
//           >
//             Fetch Gmail Messages
//           </Button>
//           <Grid2 container spacing={2}>
//             {messages.map((msg, index) => {
//               const sender = msg.payload.headers.find((h) => h.name === 'From')?.value;
//               const subject = msg.payload.headers.find((h) => h.name === 'Subject')?.value;
//               const receivedTime = formatDate(msg.internalDate);

//               return (
//                 <Grid2 item xs={12} key={index}
//                 container spacing={3} 
//                 justifyContent="center" 
//                 alignItems="center" 
//                 style={{ width: '80%', margin: '0 auto' }}>
//                   <Card
//                     sx={{
//                       backgroundColor: '#f9f0f1',
//                       transition: 'background-color 0.3s ease',
//                       cursor: 'pointer',
//                       '&:hover': {
//                         backgroundColor: '#e6ddde',
//                       },
//                     }}
//                   >
//                     <CardContent>
//                       <Box display="flex" justifyContent="space-between" alignItems="center">
//                         <Box>
//                           <Typography variant="subtitle1" fontWeight="bold">
//                             {sender}
//                           </Typography>
//                           <Typography variant="body1">{subject}</Typography>
//                           <Typography variant="caption" color="textSecondary">
//                             Received: {receivedTime}
//                           </Typography>
//                         </Box>
//                         <Box>
//                           <a
//                             href={`https://mail.google.com/mail/u/0/#inbox/${msg.id}`}
//                             target="_blank"
//                             rel="noopener noreferrer"
//                             style={{ textDecoration: 'none' }}
//                           >
//                             <Button
//                               variant="outlined"
//                               color='white'
//                               style={{ marginRight: '10px' }}
//                             >
//                               Open in Gmail
//                             </Button>
//                           </a>
//                           <Button variant="contained" color='#A3C6C4'>
//                             Summarize
//                           </Button>
//                         </Box>
//                       </Box>
//                     </CardContent>
//                   </Card>
//                 </Grid2>
//               );
//             })}
//           </Grid2>
//         </div>
//       ) : (
//         <Typography variant="h6" color="textSecondary">
//           Please log in to access Gmail messages.
//         </Typography>
//       )}
//     </div>
//   );
// };

// export default Gmail;
// 'use client';

// import React, { useEffect, useState } from 'react';
// import Script from 'next/script';
// import { useSession } from "next-auth/react";

// const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
// const API_KEY = process.env.GOOGLE_API_KEY;
// const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

// const Gmail = () => {
//   const { data: session } = useSession();
//   const [messages, setMessages] = useState([]);
//   const [isGapiLoaded, setIsGapiLoaded] = useState(false);

//   // Load gapi and initialize
//   useEffect(() => {
//     if (!session) return;

//     console.log('Session:', session);
//     console.log('Access Token:', session.accessToken);

//     const initializeGapi = async () => {
//       await gapi.client.init({
//         apiKey: API_KEY,
//         discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
//       });

//       gapi.client.setToken({ access_token: session.accessToken });
//       setIsGapiLoaded(true);
//     };

//     if (window.gapi) {
//       gapi.load('client', initializeGapi);
//     }
//   }, [session]);

//   const fetchMessages = async () => {
//     if (!isGapiLoaded) return;

//     try {
//       const response = await gapi.client.gmail.users.messages.list({
//         userId: 'me',
//         maxResults: 15,
//       });

//       const messageDetails = await Promise.all(
//         response.result.messages.map((msg) =>
//           gapi.client.gmail.users.messages.get({
//             userId: 'me',
//             id: msg.id,
//           })
//         )
//       );

//       setMessages(messageDetails.map((res) => res.result));
//     } catch (error) {
//       console.error('Error fetching Gmail messages:', error);
//     }
//   };

//   return (
//     <div style={{ backgroundColor: '#FADADD', minHeight: '100vh', padding: '20px' }}>
//       <Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client')} />
//       <Script src="https://accounts.google.com/gsi/client" />
      
//       {session ? (
//         <div>
//           <button onClick={fetchMessages}>Fetch Gmail Messages</button>
//           <h3>Your Gmail Messages:</h3>
//           {messages.map((msg, index) => (
//             <div key={index}>
//               <p>Subject: {msg.payload.headers.find((h) => h.name === 'Subject')?.value}</p>
//             </div>
//           ))}
//         </div>
//       ) : (
//         <p>Please log in to access Gmail messages.</p>
//       )}
//     </div>
//   );
// };

// export default Gmail;
