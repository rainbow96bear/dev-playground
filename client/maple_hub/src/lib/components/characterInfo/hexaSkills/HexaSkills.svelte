<script lang="ts">
    import { browser } from '$app/environment';
    import { page } from '$app/stores';

    const rootURL = import.meta.env.VITE_ROOT_URL; // 환경 변수
    let hexaSkills: any = null; // 초기화
    let isLoading = false; // 로딩 상태 관리

    // 데이터 가져오기 함수
    const fetchHexaSkills = async (name: string | null) => {
        if (!name || !browser) return; // 이름이 없거나 서버 환경일 경우 실행하지 않음

        isLoading = true; // 로딩 상태 시작
        try {
            const res = await fetch(`${rootURL}/api/data/hexa_skills?name=${name}`);
            if (res.ok) {
                hexaSkills = await res.json();
                console.log(hexaSkills)
            } else {
                console.log("Failed to load hexaSkills");
            }
        } catch (error) {
            console.log("Error fetching hexaSkills:", error);
        } finally {
            isLoading = false; // 로딩 상태 종료
        }
    };

    // URL 변경 감지 및 데이터 로드
    $: {
        const characterName = $page.url.searchParams.get('name');
        fetchHexaSkills(characterName);
    }
</script>

<div>
    {#if isLoading}
        <p>로딩 중...</p>
    {:else if hexaSkills}
        {#each hexaSkills?.character_hexa_core_equipment as skill}
            <div>
                {skill?.hexa_core_name} : Lv {skill?.hexa_core_level}
            </div>
        {/each}
    {:else}
        <p>데이터를 찾을 수 없습니다.</p>
    {/if}
</div>
