<template>
    <div :class="['service-container', visible ? 'service-container-visible' : '']">
        <div class="service">
            <div class="content"></div> 
            <div class="overlay"></div>
            <p v-if="!title.startsWith('/')" class="title-service title-text-service">{{ title }}</p> 
            <img v-else class="title-service" :src="title" />
        </div>
        <h4 class="description">{{ description }}</h4>
    </div>
</template>

<script>
 
import { ref } from 'vue';

export default {
    props: {
        title: {
            type: String, 
            required: true
        }, 
        description: {
            type: String, 
            required: true
        }
    }, 

    setup(props) {
        const visible = ref(false), serviceName = props.title.startsWith("/") ? 'incubateur' : props.title

        return { visible, serviceName }
    }, 

    mounted() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if(entry.intersectionRatio > 0) {
                    const currentSection = entry.target.getAttribute("class").replace("bloc-service", "").replace("service-", '').trim()
                    if(currentSection === this.serviceName) this.visible = true;
                }
            })
        }, { rootMargin: '0px 0px -300px 0px' })

        document.querySelectorAll('.bloc-service').forEach(service => observer.observe(service))
    }
}
</script>

<style>
.service-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
    width: 300px;
    opacity: 0;
    transform: translateY(-50px);
}

.service-container-visible {
    animation: goBack 1s ease 1 forwards;
}

.service-container-visible .overlay {
    animation: appBox 2.5s ease 1 forwards;
}

.service {
    height: 250px;
    width: 250px;
    clip-path: polygon(0 30%, 50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%);
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.content {
    height: 240px;
    width: 240px;
    clip-path: polygon(0 30%, 50% 0, 100% 30%, 100% 70%, 50% 100%, 0 70%);
    background-color: white;
}

.overlay {
    top: 0;
    width: 100%;
    height: 0%;
    background-color: darkblue;
    position: absolute;
    z-index: -5;
}

.title-service {
    position: absolute;
    height: fit-content;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    text-align: center;
} 

img.title-service {
    height: 100px;
    width: auto;
}

.title-text-service {
    font-size: 35px;
    font-weight: 600;
    font-variant-caps: small-caps;
    color: black !important;
}

.description {
    font-weight: 500;
    font-size: 19px;
    width: 80%;
    margin: 15px auto auto auto;
    text-align: center;
}

@keyframes appBox {
    from { height: 0%; } 
    to { height: 100%; }
}

@keyframes goBack {
    to {
        transform: translateY(0);
        opacity: 1;
    }
}
</style>