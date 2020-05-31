<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="modal-mask" v-show="showMast"></div>
      <!-- 主体内容 -->
      <div class="modal-content">
        <div class="modal-header clear-fix">
          <span class="modal-tital fl">{{ title }}</span>
          <a
            href="javascript:;"
            class="header-close fr"
            @click="$emit('onClose')"
          ></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <button
            class="btn-item"
            @click="$emit('onConfirm')"
            v-if="buttonNum === 2"
          >
            {{ confirmText }}
          </button>
          <button
            class="btn-item btn-close"
            @click="$emit('onClose')"
            v-if="buttonNum === 2"
          >
            {{ CloseText }}
          </button>
          <button
            class="btn-item"
            @click="$emit('onConfirm')"
            v-if="buttonNum === 1"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "modal",
  props: {
    title: {
      // 标题
      type: String,
      default: "提示",
    },
    confirmText: {
      // 确认文字
      type: String,
      default: "确定",
    },
    CloseText: {
      // 取消文字
      type: String,
      default: "取消",
    },
    showMast: {
      // 遮罩展示
      type: Boolean,
      default: true,
    },
    showModal: {
      // 展示模态框
      type: Boolean,
      default: false,
    },
    buttonNum: {
      // 底部按钮的数量
      type: Number,
      default: 2,
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
  transition: top 0.4s linear;
}
.modal .modal-mask {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0.5;
}
.modal .modal-content {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 660px;
  background-color: #fff;
  transform: translate(-50%, -50%);
  color: #333;
}
.modal .modal-header {
  font-size: 20px;
  background-color: #f5f5f5;
  padding: 30px;
  text-align: start;
  line-height: 0;
}
.modal .modal-header .header-close::after {
  font-family: "icomoon";
  content: "\ea0d";
  color: #333;
}
.modal .modal-header .header-close:hover.header-close::after {
  color: var(--color-topic);
}
.modal .modal-body {
  padding: 40px 40px 0 40px;
  font-size: 20px;
  text-align: start;
  line-height: 0;
}
.modal .modal-footer {
  padding: 20px 0;
  background-color: #f5f5f5;
  text-align: center;
}
.modal .modal-footer .btn-item {
  border: none;
  background-color: var(--color-topic);
  width: 160px;
  height: 40px;
  color: #fff;
  font-size: 14px;
  text-align: center;
  cursor: pointer;
  margin: 0 10px;
}
.modal .modal-footer .btn-close {
  background-color: #666;
}
.modal .modal-footer .btn-item:hover {
  opacity: 0.7;
}

.modal.slide-enter,
.modal.slide-leave-to {
  top: -100%;
}
.modal.slide-leave {
  top: 50%;
}
</style>
