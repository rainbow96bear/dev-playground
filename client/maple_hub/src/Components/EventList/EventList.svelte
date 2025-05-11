<script lang="ts">
  export let eventList;

  // 날짜 포맷 함수
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
</script>

<section class="event-section" role="region" aria-labelledby="event-section-heading">
<h2 id="event-section-heading" class="event-heading">메이플스토리 최신 이벤트</h2>
<div class="event-box">
  {#each eventList.event_notice as event}
  <article class="event-item" role="article">
      <header>
        <h3 class="event-title">
          <a 
            href={event.url} 
            target="_blank" 
            rel="noopener noreferrer"
            aria-label="이벤트 상세 페이지로 이동"
            class="event-link"
          >
            {event.title}
          </a>
        </h3>
      </header>
      <p class="event-date">
        <time datetime={event.date_event_start}>
          기간: {formatDate(event.date_event_start)} ~ {formatDate(event.date_event_end)}
        </time>
      </p>
  </article>
  {/each}
</div>
</section>

<style>
.event-section {
  padding: 1.5rem;
  width: 100%;
  margin: 0 auto;
}

.event-heading {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #222;
  border-bottom: 2px solid #ccc;
  padding-bottom: 0.5rem;
}

.event-box {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.event-item {
  min-width: 300px;
  margin-bottom: 1.2rem;
  border: 1px solid #eee;
  border-radius: 8px;
  background-color: #fafafa;
  transition: box-shadow 0.2s ease;
  padding:10px;
}

.event-item:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.event-link {
  display: block;
  text-decoration: none;
  color: inherit;
}

.event-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin: 0 0 0.3rem 0;
  word-wrap: break-word;
  overflow-wrap: break-word;
  white-space: normal;
}

.event-date {
  font-size: 0.9rem;
  color: #555;
}
</style>
