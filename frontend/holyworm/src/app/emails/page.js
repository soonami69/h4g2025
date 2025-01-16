'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from "next-auth/react";
import { Box, Button, Typography, Card, CardContent, Grid2, Collapse } from '@mui/material';
import OpenAI from "openai";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const API_KEY = process.env.GOOGLE_API_KEY;
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

console.log('Loaded Environment Variables:', process.env);

console.log(process.env.GOOGLE_API_KEY);
console.log(process.env.NEXT_PUBLIC_OPENAI_API_KEY);


const Gmail = () => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState([]);
  const [isGapiLoaded, setIsGapiLoaded] = useState(false);
  const [summaries, setSummaries] = useState({}); // Store summaries for each email
  const openai = new OpenAI({apiKey: 'api-key', dangerouslyAllowBrowser: true}); // Initialize OpenAI
  const [isLoading, setIsLoading] = useState(false);

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
    console.log("I pressed button")
    try {
      setIsLoading(true);
      const response = await gapi.client.gmail.users.messages.list({
        userId: 'me',
        maxResults: 8,
      });

      const messageDetails = await Promise.all(
        response.result.messages.map((msg) =>
          gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
          })
        )
      );

      setIsLoading(false);

      setMessages(messageDetails.map((res) => res.result));
    } catch (error) {
      console.error('Error fetching Gmail messages:', error);
    }
  };

  const extractPlainText = (email) => {
    const bodyData = email.payload.parts?.find((part) => part.mimeType === "text/plain")?.body?.data;

    if (bodyData) {
      const decodedData = atob(bodyData.replace(/-/g, '+').replace(/_/g, '/'));
      return decodedData;
    }

    return "No plain text content found in this email.";
  };

  const summarizeEmail = async (email, id) => {
    try {
      const emailContent = extractPlainText(email);

      // Send email content to OpenAI for summarization
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful assistant that summarizes email threads well using minimal words." },
          { role: "user", content: `Summarize this email thread and keep it short, phrased like how the receiver is addressed in the email: ${emailContent}` },
        ],
      });

      const summary = completion.choices[0].message.content;

      // Update the state with the summary
      setSummaries((prev) => ({
        ...prev,
        [id]: summary,
      }));
    } catch (error) {
      console.error('Error summarizing email:', error);
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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />

          {!isGapiLoaded ? 
          <Typography variant="h3" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }} gutterBottom color="black">
          Connecting to Gmail...
        </Typography>
        : <div></div>}

          {isGapiLoaded ? <Typography variant="h3" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }} gutterBottom color="black">
            Your Emails:
          </Typography> 
          : <div></div>}
          
          {isGapiLoaded && isLoading ? 
            <Typography variant="h5" style={{fontFamily: 'Poppins, sans-serif', textAlign: 'center'}} gutterBottom color="black">
            Loading emails...
          </Typography>
          : <div></div>}

          <Button 
            variant="contained" 
            onClick={fetchMessages}
            style={{ marginBottom: '20px', backgroundColor: '#96b6e4', alignSelf: 'center' }}
            disabled={!isGapiLoaded}
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
              const summary = summaries[msg.id]; // Retrieve the summary for this email

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
                        <Box sx={{ flex: '1 1 20%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          <Typography variant="subtitle1" fontWeight="bold">
                            {sender}
                          </Typography>
                        </Box>

                        <Box sx={{ flex: '2 1 40%', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', paddingLeft: '10px' }}>
                          <Typography variant="body1">
                            {subject}
                          </Typography>
                        </Box>

                        <Box sx={{ flex: '1 1 20%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
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
                              color: 'white',
                              '&:hover': { backgroundColor: '#82ace3' } 
                            }}
                            onClick={() => summarizeEmail(msg, msg.id)}
                          >
                            Summarize
                          </Button>
                        </Box>
                      </Box>
                    </CardContent>
                    <Collapse in={!!summary}>
                      <Box sx={{ padding: '10px', backgroundColor: '#fff3fa' }}>
                        <Typography variant="body2" style={{ whiteSpace: 'pre-line' }}>
                          {summary || "Summarizing..."}
                        </Typography>
                      </Box>
                    </Collapse>
                  </Card>
                </Grid2>
              );
            })}
          </Grid2>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} class="mt-80">

        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" />

          <Typography variant="h4" style={{ fontFamily: 'Poppins, sans-serif', textAlign: 'center' }} gutterBottom color="black">
          Please log in to access Gmail messages.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Gmail;
