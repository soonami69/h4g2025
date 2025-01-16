'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import { useSession } from "next-auth/react";

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

    console.log('Session:', session);
    console.log('Access Token:', session.accessToken);

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

  return (
    <div>
      <Script src="https://apis.google.com/js/api.js" onLoad={() => gapi.load('client')} />
      <Script src="https://accounts.google.com/gsi/client" />
      
      {session ? (
        <div>
          <button onClick={fetchMessages}>Fetch Gmail Messages</button>
          <h3>Your Gmail Messages:</h3>
          {messages.map((msg, index) => (
            <div key={index}>
              <p>Subject: {msg.payload.headers.find((h) => h.name === 'Subject')?.value}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>Please log in to access Gmail messages.</p>
      )}
    </div>
  );
};

export default Gmail;
