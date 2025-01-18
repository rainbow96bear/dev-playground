<script>
  import { onMount } from 'svelte';
  import { createClient } from 'graphql-ws';
  import { writable } from 'svelte/store';

  // 메시지 저장소
  export const messages = writable([]);

  let newMessage = ''; // 사용자 입력 메시지
  let mediaURL = ''; // 미디어 URL 입력
  let mediaType = ''; // 미디어 타입 입력

  onMount(() => {
    const client = createClient({
      url: 'ws://localhost:8080/query', // 서버 WebSocket 주소
    });

    // GraphQL Subscription 실행
    const subscription = {
      query: `
        subscription {
          messageSent {
            id
            content
            mediaURL
            mediaType
            timestamp
          }
        }
      `,
    };

    // Subscription 구독
    client.subscribe(subscription, {
      next: ({ data }) => {
        if (data && data.messageSent) {
          messages.update((current) => [...current, data.messageSent]);
        }
      },
      error: (err) => {
        console.error('Subscription error:', err);
      },
      complete: () => {
        console.log('Subscription completed');
      },
    });
  });

  // 메시지 전송 함수
  async function sendMessage() {
    if (newMessage.trim() === '') return;

    // 메시지 전송용 GraphQL Mutation
    const response = await fetch('http://localhost:8080/query', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          mutation {
            sendMessage(content: "${newMessage}", mediaURL: "${mediaURL}", mediaType: "${mediaType}") {
              id
              content
              mediaURL
              mediaType
              timestamp
            }
          }
        `,
      }),
    });

    const result = await response.json();
    console.log(result);

    // 입력 필드 초기화
    newMessage = '';
    mediaURL = '';
    mediaType = '';
  }
</script>

<h1>Real-time Chat</h1>

<!-- 채팅 메시지 출력 -->
<ul>
  {#each $messages as message (message.id)}
    <li>
      <strong>{message.content}</strong>
      {#if message.mediaURL}
        <div>
          <small>Media:</small>
          {#if message.mediaType === 'image'}
            <img src={message.mediaURL} alt="Media" style="max-width: 100px;" />
          {/if}
          {#if message.mediaType === 'video'}
            <video src={message.mediaURL} controls style="max-width: 100px;"></video>
          {/if}
        </div>
      {/if}
      <small>{message.timestamp}</small>
    </li>
  {/each}
</ul>

<!-- 메시지 입력 및 전송 -->
<input bind:value={newMessage} placeholder="Type a message..." />
<input bind:value={mediaURL} placeholder="Media URL (optional)" />
<input bind:value={mediaType} placeholder="Media Type (e.g., 'image' or 'video')" />
<button on:click={sendMessage}>Send</button>
