<template lang="pug">
  .slider-input
    el-input(
      v-model="value"
      @blur="sumStringFormat"
      @keyup.enter="sumStringFormat"
      @focus="clearInput"
    )

    el-slider(
      :value="sliderValue"
      :min="minValue"
      :max="maxValue"
      :show-tooltip="false"
      @input="onInputSliderValue"
      @change="onChangeSliderValue"
    )

    .slider-input__terms
      .slider-input__terms-text-l {{ formatPrice(minValue) }}

      .slider-input__terms-text-r {{ allContribution }}

</template>

<script>
import Vue from 'vue';

export default Vue.extend({
  name: 'SliderInput',

  props: {
    baseSum: {
      type: Number,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
    minValue: {
      type: Number,
      required: true,
    },
    maxValue: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      sum: 0,
      value: '0',
    };
  },
});
</script>

<style lang="sass">
.slider-input
  .el-input__inner
    height: 46px
    max-width: 100%
    border-color: #9EADBA
    color: $black
    font-size: 20px
    font-weight: normal
    line-height: 24px
    letter-spacing: -0.01em

    &:hover,
    &:focus,
    &:active
      border-color: #9EADBA

  .el-slider
    &__runway
      position: relative
      top: -2px
      width: 100%
      height: 4px
      margin: 0
      background: $color-geyser

    &__bar
      border-radius: 0
      background: $second-color-dark

    &__button
      width: 20px
      height: 20px
      border: 1px solid $color-geyser

      &:after
        content: ''
        position: absolute
        top: calc(50% - 3px)
        left: calc(50% - 3px)

        width: 6px
        height: 6px
        border-radius: 50%
        background: $second-color-dark

  &__label,
  &__terms
    margin-bottom: 4px
    color: $color-regent-gray
    font-size: 14px
    font-weight: 300
    line-height: 18px
    letter-spacing: -0.01em

  &__terms
    display: flex
    justify-content: space-between
    margin-top: 8px
</style>
