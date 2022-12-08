"use strict";(self["webpackChunki_am_verifiable_create"]=self["webpackChunki_am_verifiable_create"]||[]).push([[485],{30423:(e,a,s)=>{s.r(a),s.d(a,{default:()=>ie});var t=s(66252),i=s(2262),l=s(3577),r=s(21755),n=s(22201),o=s(33907),c=s(69528),d=s(20747);const u={__name:"IAmVerifiableButton",props:{requisites:{type:Array,required:!0},isVerifying:{type:Boolean,default:!1},log:{type:Boolean,default:!1}},emits:["verification:started","verification:ended","verification:succeded","verification:failed","update:isVerifying"],setup(e,{emit:a}){const s=e,{log:l}=s,r=(0,t.Fl)({get:()=>s.isVerifying,set:e=>a("update:isVerifying",e)}),n=async()=>{const e=new Date;a("verification:started"),r.value=!0;const t=await(0,c.g8)(s.requisites??[]);r.value=!1,a(t?"verification:succeded":"verification:failed"),a("verification:ended");const i=new Date,n=(i-e)/1e3;return l&&console.log("Verification duration was ",Math.round(n)),t};return(e,a)=>((0,t.wg)(),(0,t.iD)("button",{onClick:n,class:"i-am-verifiable-button"},[(0,t.WI)(e.$slots,"default",{isVerifying:(0,i.SU)(r)})]))}},p=u,f=p,v=f;var g=s(3131);const b=e=>{const a=(0,d.dN)(e);return Number.parseFloat(a.replace(`${e.currency.symbol} `,""))};var y=s(68893),m=s(15130);const h=e=>((0,t.dD)("data-v-b04e5fe6"),e=e(),(0,t.Cn)(),e),w={class:"py-4 px-2"},x=h((()=>(0,t._)("h6",{class:"text-gray-500"},"Precio de este dispensador",-1))),_={class:"text-primary-700 font-bold text-3xl my-2"},k={class:"mb-4"},S={__name:"CandyMachineBuyRow",props:["candyMachine","requisites","nft","disabledExternal"],emits:["purchase:started","purchase:succeded","purchase:ended"],setup(e,{emit:a}){const s=e,n=(0,o.oR)(),{candyMachine:u,nft:p,disabledExternal:f}=(0,i.BK)(s),h=(0,i.iH)(!1),S=(0,i.iH)(!1),U=(0,t.Fl)((()=>(0,d.dN)(u.value.price))),{connected:D}=(0,m.Os)(),{nftsOfUser:M,isFetchingNftsOfUser:C}=(0,c.jK)(),F=(0,t.Fl)((()=>M.value?M.value.map((e=>e.collection.address.toBase58())):[])),q=(0,t.Fl)((()=>F.value.includes(p.value.address.toBase58()))),V=(0,t.Fl)((()=>C.value||h.value||S.value||!D.value||q.value||f.value)),B=()=>{(0,y.h)({type:"error",title:"No se poseen los requisitos necesarios para poder comprar esta credencial."})},j=async()=>{const{metaplex:e,connectionConfirm:s}=(0,g.cF)(),{publicKey:t}=(0,g.bB)();S.value=!0;const{wallet:i,sendTransaction:l,publicKey:o}=(0,m.Os)();a("purchase:started");const d=!0;if(d)try{i.value;let e=(new r.Transaction).add(r.SystemProgram.transfer({fromPubkey:o.value,toPubkey:t,lamports:r.LAMPORTS_PER_SOL*b(u.value.price)}));const{context:{slot:n},value:{blockhash:d,lastValidBlockHeight:p}}=await s.getLatestBlockhashAndContext(),f=await l(e,s,{minContextSlot:n}),v=await s.confirmTransaction({blockhash:d,lastValidBlockHeight:p,signature:f});if(v.value.err)(0,y.h)({type:"error",title:"Ocurrio un error al generar la credencial si los problemas persisten refresca la página."});else{const e=await _axios.post("mint/nft",{candyMachine:u.value.address,wallet:o.value}),s=e.data.nft;s.transactions=e.data.transactions,M.value.push((0,c.bq)(s)),a("purchase:succeded",u),(0,y.h)({type:"success",title:"Se ha comprado con éxito la credencial."})}}catch(p){if(p.name&&"metaplexerror"==p.name.toLowerCase()&&p.cause.message.toLowerCase().includes("attempt to debit an account but found no record of a prior credit"))(0,y.h)({type:"error",title:"No se tiene el suficiente crédito para comprar la credencial."});else{(0,y.h)({type:"error",title:"Ocurrio un error al generar la credencial si los problemas persisten refresca la página."});const a=await e.value.candyMachinesV2().refresh(u.value),s=a.address.toBase58();n.state.credentials.candyMachinesMapped[s]=a}}else B();S.value=!1,a("purchase:ended")},P=(0,t.Fl)((()=>q.value?"Ya se tiene la credencial":h.value?"Verificando":S.value?"Procesando":"Comprar credencial"));return(a,s)=>((0,t.wg)(),(0,t.iD)("div",w,[x,(0,t._)("h2",_,(0,l.zw)((0,i.SU)(U)),1),(0,t._)("div",k,"En este dispensador se poseen "+(0,l.zw)((0,i.SU)(u).itemsRemaining.toString())+" disponibles",1),(0,t.Wm)((0,i.SU)(v),{class:(0,l.C_)(["py-3 px-8 rounded-lg text-white",{"purchase-button":!(0,i.SU)(V),"purchase-button-disabled":(0,i.SU)(V)}]),disabled:(0,i.SU)(V),isVerifying:h.value,"onUpdate:isVerifying":s[0]||(s[0]=e=>h.value=e),"onVerification:failed":B,"onVerification:succeded":j,requisites:e.requisites??[],log:""},{default:(0,t.w5)((()=>[(0,t.Uk)((0,l.zw)((0,i.SU)(P)),1)])),_:1},8,["class","disabled","isVerifying","requisites"])]))}};var U=s(83744);const D=(0,U.Z)(S,[["__scopeId","data-v-b04e5fe6"]]),M=D,C=e=>((0,t.dD)("data-v-0908db26"),e=e(),(0,t.Cn)(),e),F={class:"container mx-auto flex flex-wrap py-8"},q={key:0,class:"w-full"},V=C((()=>(0,t._)("div",{class:"text-xl font-semibold text-center mt-2"},"Cargando Credencial",-1))),B={key:1,class:"mx-auto"},j=C((()=>(0,t._)("div",{class:"text-xl font-semibold text-center mt-2"},"Hubo un error al cargar la credencial por favor prueba de nuevo",-1))),P={class:"flex flex-wrap w-full md:w-2/5 lg:w-2/6 gap-y-8"},H=["src"],N={key:1,class:"credential-cover"},O={class:"w-full rounded-lg border border-slate-300 overflow-clip"},R=C((()=>(0,t._)("div",{class:"text-lg p-3 text-center font-bold border-b border-slate-300"},"Descripción",-1))),A={class:"text-base p-3 w-full bg-slate-300/20"},E=C((()=>(0,t._)("div",{class:"text-lg p-3 text-center font-bold border-y border-slate-300"},"Requisitos",-1))),K={class:"text-base w-full bg-slate-300/20 p-3"},z={key:1,class:"list-disc list-outside px-3"},L={key:2},I={class:"px-8 w-full md:w-3/5 lg:w-4/6"},Y={class:"flex flex-col gap-y-4"},$={class:"text-3xl font-bold"},T=C((()=>(0,t._)("h1",{class:"text-base font-light"},"hecho por RENAP",-1))),W={class:"w-full rounded-lg border border-slate-300 overflow-clip"},Z=C((()=>(0,t._)("h1",{class:"text-xl p-3 text-center font-bold border-b border-slate-300"},"Configuración",-1))),G={class:"text-base p-3 w-full bg-slate-300/20"},J={class:"w-full rounded-lg border border-slate-300 overflow-clip"},Q=C((()=>(0,t._)("div",{class:"text-lg p-3 text-center font-bold border-b border-slate-300"},"Detalles de compra",-1))),X={class:"text-base p-3 w-full bg-slate-300/20"},ee={key:1},ae={key:2,class:"flex flex-wrap"},se={__name:"CredentialDetail",setup(e){const a=(0,n.yj)(),s=(0,o.oR)(),d=a.params.address,u=(0,i.iH)(!1),p=(0,i.iH)(!1),f=(0,i.iH)(!1),v=(0,t.Fl)((()=>s.getters.nftsMapped[d])),{requisites:b,isFetchingRequisited:y}=(0,c.Pb)(v),{nftsOfUser:m,isFetchingNftsOfUser:h}=(0,c.jK)(),w=(0,t.Fl)((()=>{if(v.value.json&&v.value.json.expiration){const e=v.value.json.expiration;return`La credencial expira ${e.years} años, ${e.months} meses y ${e.days} días despues de su emisión`}return"Esta credencial no expira"})),x=(0,t.Fl)((()=>v.value&&v.value.json?v.value.json.image:null)),_=(0,t.Fl)((()=>s.getters.candyMachinesMintMapped)),k=(0,t.Fl)((()=>{if(v.value){const e=v.value.mint.address.toBase58();if(e in _.value)return _.value[e].filter((e=>parseInt(e.itemsRemaining.toString())>0))}return[]})),S=async e=>{"string"==typeof e.collectionMintAddress?e.collectionMintAddress:e.collectionMintAddress.toBase58();const{metaplex:a}=(0,g.cF)(),t=await a.value.candyMachinesV2().refresh(e);s.dispatch("updateCandyMachine",t)},U=async()=>{u.value=!0,await s.dispatch("getNftFromMintAddress",new r.PublicKey(d)),u.value=!1},D=async()=>{f.value=!0,await s.dispatch("getCandyMachines",d),f.value=!1};return(0,t.bv)((async()=>{v.value||await U(),D()})),(e,a)=>{const s=(0,t.up)("lottie-player"),r=(0,t.up)("v-spinner");return(0,t.wg)(),(0,t.iD)("div",F,[u.value?((0,t.wg)(),(0,t.iD)("div",q,[(0,t.Wm)(s,{class:"self-center mt-4 mx-auto",src:"https://assets9.lottiefiles.com/packages/lf20_usmfx6bp.json",background:"transparent",speed:"1",style:{width:"300px",height:"300px"},loop:"",autoplay:""}),V])):(0,i.SU)(v)?((0,t.wg)(),(0,t.iD)(t.HY,{key:2},[(0,t._)("div",P,[(0,i.SU)(x)?((0,t.wg)(),(0,t.iD)("img",{key:0,src:(0,i.SU)(x),class:"credential-cover"},null,8,H)):((0,t.wg)(),(0,t.iD)("div",N)),(0,t._)("div",O,[R,(0,t._)("div",A,(0,l.zw)((0,i.SU)(v).json.description),1),E,(0,t._)("div",K,[(0,i.SU)(y)?((0,t.wg)(),(0,t.iD)(t.HY,{key:0},[(0,t.Uk)("Cargando requisitos")],64)):(0,i.SU)(b).length?((0,t.wg)(),(0,t.iD)("ul",z,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,i.SU)(b),(e=>((0,t.wg)(),(0,t.iD)("li",{key:e.address.toBase58()},(0,l.zw)(e.name),1)))),128))])):((0,t.wg)(),(0,t.iD)("div",L,"No tiene requisitos"))])])]),(0,t._)("div",I,[(0,t._)("div",Y,[(0,t._)("h1",$,(0,l.zw)((0,i.SU)(v).name),1),T,(0,t._)("div",W,[Z,(0,t._)("div",G,(0,l.zw)((0,i.SU)(w)),1)]),(0,t._)("div",J,[Q,(0,t._)("div",X,[f.value?((0,t.wg)(),(0,t.j4)(r,{key:0})):(0,i.SU)(k).length?((0,t.wg)(),(0,t.iD)("div",ae,[((0,t.wg)(!0),(0,t.iD)(t.HY,null,(0,t.Ko)((0,i.SU)(k),(e=>((0,t.wg)(),(0,t.j4)((0,i.SU)(M),{disabledExternal:p.value,class:"border-b border-gray-300 last:border-b-0 md:w-full lg:w-1/2 xl:w-1/3","onPurchase:started":a[0]||(a[0]=e=>p.value=!0),"onPurchase:ended":a[1]||(a[1]=e=>p.value=!1),"onPurchase:succeded":()=>S(e),key:e.address.toBase58(),candyMachine:e,nft:(0,i.SU)(v),requisites:(0,i.SU)(v).json.requisites??[]},null,8,["disabledExternal","onPurchase:succeded","candyMachine","nft","requisites"])))),128))])):((0,t.wg)(),(0,t.iD)("div",ee,"No hay opciónes de compra por el momento"))])])])])],64)):((0,t.wg)(),(0,t.iD)("div",B,[(0,t.Wm)(s,{class:"self-center mt-4 mx-auto",src:"https://assets4.lottiefiles.com/private_files/lf30_e3pteeho.json",background:"transparent",speed:"1",style:{width:"300px",height:"300px"},loop:"",autoplay:""}),j]))])}}},te=(0,U.Z)(se,[["__scopeId","data-v-0908db26"]]),ie=te}}]);
//# sourceMappingURL=CredentialDetail.552fb34f.js.map