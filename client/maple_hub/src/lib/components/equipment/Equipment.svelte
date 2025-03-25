<script lang="ts">
	import { itemInfoForCube } from "$lib/store";
    import EquipmentIcon from "../equipmentIcon/EquipmentIcon.svelte";
    import "./Equipment.css"
    
    export let equippedItems;
    let weapon;
    let emblem;
    let subweapon;
    let shield;
    let head;
    let top;
    let suit;
    let bottom;
    let shoes;
    let gloves;
    let cloak;
    let belt;
    let shoulder;
    let face;
    let eyes;
    let ears;
    let ring1;
    let ring2;
    let ring3;
    let ring4;
    let pendant1;
    let pendant2;
    let heart;
    let pocket;
    let medal;
    let badge;
    $:{
        equippedItems?.forEach(item => {
            switch (item.item_equipment_slot) {
                case "무기":
                    weapon = item;
                    break;
                case "엠블렘":
                    emblem = item;
                    break;
                case "보조무기":
                    subweapon = item;
                    break;
                case "방패":
                    shield = item;
                    break;
                case "모자":
                    head = item;
                    break;
                case "상의":
                    top = item;
                    break;
                case "한벌옷":
                    suit = item;
                    break;
                case "하의":
                    bottom = item;
                    break;
                case "신발":
                    shoes = item;
                    break;
                case "장갑":
                    gloves = item;
                    break;
                case "망토":
                    cloak = item;
                    break;
                case "벨트":
                    belt = item;
                    break;
                case "어깨장식":
                    shoulder = item;
                    break;
                case "얼굴장식":
                    face = item;
                    break;
                case "눈장식":
                    eyes = item;
                    break;
                case "귀고리":
                    ears = item;
                    break;
                case "반지1":
                    ring1 = item;
                    break;
                case "반지2":
                    ring2 = item;
                    break;
                case "반지3":
                    ring3 = item;
                    break;
                case "반지4":
                    ring4 = item;
                    break;
                case "펜던트":
                    pendant1 = item;
                    break;
                case "펜던트2":
                    pendant2 = item;
                    break;
                case "기계 심장":
                    heart = item;
                    break;
                case "훈장":
                    medal = item;
                    break;
                case "포켓 아이템":
                    pocket = item;
                    break;
                case "뱃지":
                    badge = item;
                    break;
                default:
                    console.warn(`Unknown slot: ${item.item_equipment_slot}`);
            }
        });
    }
    const setItem = (item) => {
      itemInfoForCube.set(item);
    };  

</script>

  
<div class="grid">
    <EquipmentIcon  func={() => setItem(ring4)}  class="cell" item={ring4}></EquipmentIcon>
    <div class="cell"></div>
    <EquipmentIcon  func={() => setItem(head)}  class="cell" item={head}></EquipmentIcon>
    <div class="cell"></div>
    <EquipmentIcon  func={() => setItem(emblem)}  class="cell" item={emblem}></EquipmentIcon>
    
    <EquipmentIcon  func={() => setItem(ring3)}  class="cell" item={ring3}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(pendant2)}  class="cell" item={pendant2}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(face)}  class="cell" item={face}></EquipmentIcon>
    <div class="cell"></div>
    <EquipmentIcon class="cell" item={badge}></EquipmentIcon>

    <EquipmentIcon  func={() => setItem(ring2)}  class="cell" item={ring2}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(pendant1)}  class="cell" item={pendant1}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(eyes)}  class="cell" item={eyes}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(ears)}  class="cell" item={ears}></EquipmentIcon>
    <EquipmentIcon class="cell" item={medal}></EquipmentIcon>
    
    <EquipmentIcon  func={() => setItem(ring1)}  class="cell" item={ring1}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(weapon)}  class="cell" item={weapon}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(top)}  class="cell" item={top}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(shoulder)}  class="cell" item={shoulder}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(subweapon)}  class="cell" item={subweapon}></EquipmentIcon>
  
    <EquipmentIcon class="cell" item={pocket}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(belt)}  class="cell" item={belt}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(bottom)}  class="cell" item={bottom}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(gloves)}  class="cell" item={gloves}></EquipmentIcon>
    <EquipmentIcon  func={() => setItem(cloak)}  class="cell" item={cloak}></EquipmentIcon>

    <div class="cell"></div>
    <div class="cell"></div>
    <EquipmentIcon  func={() => setItem(shoes)}  class="cell" item={shoes}></EquipmentIcon>
    <div class="cell"></div>
    <EquipmentIcon  func={() => setItem(heart)}  class="cell" item={heart}></EquipmentIcon>
</div>
  