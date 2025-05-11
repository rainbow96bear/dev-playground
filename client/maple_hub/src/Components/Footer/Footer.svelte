<script lang="ts">
    export let className: string = '';
</script>

<footer class={className} role="contentinfo">
    <div class="content">
        <section class="section" aria-labelledby="about-section">
          <h4 id="about-section">About</h4>
          <p>이 사이트는 메이플스토리 캐릭터 정보 및 시뮬레이션을 위한 비공식 웹사이트입니다.</p>
        </section>
        <section class="section" aria-labelledby="links-section">
          <h4 id="links-section">Links</h4>
          <ul>
            <li><a href="https://maplestory.nexon.com" target="_blank" rel="noopener noreferrer" title="메이플스토리 공식 사이트">메이플스토리 공식 사이트</a></li>
            <li><a href="https://openapi.nexon.com" target="_blank" rel="noopener noreferrer" title="Nexon Open API">Nexon Open API</a></li>
            <li><a href="https://github.com/rainbow96bear/dev-playground/tree/master/client/maple_hub" target="_blank" rel="noopener noreferrer" title="GitHub 저장소">GitHub</a></li>
            <li><a href="/privacy" title="개인정보 처리방침">개인정보 처리방침</a></li>
          </ul>
        </section>
        <section class="section" aria-labelledby="contact-section">
          <h4 id="contact-section">Contact</h4>
          <p>Email: <a href="mailto:rainbow96bear@gmail.com" title="이메일 보내기">rainbow96bear@gmail.com</a></p>
        </section>
    </div>
    <div class="bottom" aria-live="polite">
        <p>© 2025 Nexon API Example — 비공식 서비스이며, Nexon과 무관합니다.</p>
    </div>
</footer>

<style>
  footer {
    background-color: #f1f3f5;
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 0.9rem;
    color: #495057;
    border-top: 1px solid #dee2e6;
  }

  .content {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    width: 100%;
    max-width: 1200px;
    gap: 40px;
    margin-bottom: 20px;
  }

  .section {
    flex: 1;
    min-width: 200px;
  }

  .section h4 {
    font-size: 1rem;
    margin-bottom: 10px;
    color: #343a40;
  }

  .section ul {
    list-style: none;
    padding: 0;
  }

  .section ul li {
    margin-bottom: 6px;
  }

  .section ul li a {
    color: #495057;
    text-decoration: none;
    transition: color 0.2s;
  }

  .section ul li a:hover {
    color: #007bff;
  }

  .bottom {
    width: 100%;
    text-align: center;
    font-size: 0.8rem;
    color: #868e96;
    border-top: 1px solid #dee2e6;
    padding-top: 10px;
  }
</style>
