"use client";

import { useRouter } from "next/navigation";

function calculateTotal(deals,products,cart){
    let firstDeal=new Array();
    let secondDeal=new Array();
    let noDeal=new Array();

    //fill arrays with products
    for(let i=0;i<cart.length;i++){
        let product = products.find(el => el._id == cart[i]);
        if(product===undefined){
            break;
        }
        let activeDeal=false;
        for(let y=0;y<deals.length;y++){
            if(deals[y].productsName.includes(product.name)){
                if(deals[y].name==="3For2"){
                    firstDeal.push(product);
                }else if(deals[y].name==="50%"){
                    secondDeal.push(product);
                }
                activeDeal=true;
                break;
            }
        }
        if(!activeDeal){
            noDeal.push(product);
        }
    }
    
    //count total price
    let total=0;

    //firstDeal
    let index=0;
    while((firstDeal.length - index) >= 3){
        let firstProduct=firstDeal[index];
        let secondProduct=firstDeal[index+1];
        let thirdProduct=firstDeal[index+2];
        let sum=firstProduct.price+secondProduct.price+thirdProduct.price-Math.min(firstProduct.price,secondProduct.price,thirdProduct.price)
        total+=sum;
        console.log(total);
        index+=3;
    }
    while(index<=firstDeal.length-1){
        let activeOtherDeal=false;
        deals.map((d)=>{
            if(d.name==="50%" && d.productsName.includes(firstDeal[index].name)){
                secondDeal.push(firstDeal[index]);
                activeOtherDeal=true;
            }
        })

        if(!activeOtherDeal){total+=firstDeal[index].price;}
        index++;
    }

    //secondDeal
    secondDeal.sort(function(a,b) {
        return a.name > b.name ? 1 : -1;
    });
    index=0;
    while(index<secondDeal.length-1){
        if(secondDeal[index]._id===secondDeal[index]._id){
            total+=(secondDeal[index].price + 1/2 * secondDeal[index].price);
            index++;
        }else{
            total+=secondDeal[index].price;
        }
        index++;
    }
    if(index!=secondDeal.length){
        total+=secondDeal[index].price;
    }

    //noDeal
    noDeal.map((p)=>{total+=p.price});

    return total;
}

export default function CartInfo({deals, products}) {
    let cart=JSON.parse(localStorage.getItem("cart"));
    const router = useRouter();

    function clearCart(){
        localStorage.setItem("cart",JSON.stringify([]));
        router.refresh();
        router.push("/");
    }

    let total=Math.round(calculateTotal(deals,products,cart));

  return (
    <div>
        <h1 class="m-10 flex items-center justify-center text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Cart price: <mark class="px-2 text-white bg-blue-600 rounded dark:bg-blue-500"> {Math.floor(total/100)}aws and {total%100}clouds </mark>
        </h1>
        <div class="m-400  flex items-center justify-center">
        <button class="w-48 h-10 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4  rounded-full">
            Buy
        </button>
        <button onClick={clearCart} class="w-48 h-10 bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full m-300">
            Clear Cart
        </button>
        </div>
    </div>
  );
}