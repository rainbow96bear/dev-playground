<script lang="ts">
    export let className : string = '';
</script>

<footer class={className}>
    <div class="content">
        <div class="section">
          <h4>About</h4>
          <p>이 사이트는 메이플스토리 캐릭터 정보 및 시뮬레이션을 위한 비공식 웹사이트입니다.</p>
        </div>
        <div class="section">
          <h4>Links</h4>
          <ul>
            <li><a href="https://maplestory.nexon.com" target="_blank">메이플스토리 공식 사이트</a></li>
            <li><a href="https://openapi.nexon.com" target="_blank">Nexon Open API</a></li>
            <li><a href="https://github.com/rainbow96bear/dev-playground/tree/master/client/maple_hub" target="_blank">GitHub</a></li>
            <li><a href="/privacy">개인정보 처리방침</a></li>
          </ul>
        </div>
        <div class="section">
          <h4>Contact</h4>
          <p>Email: rainbow96bear@gmail.com</p>
        </div>
    </div>
    <div class="bottom">
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