<template lang="pug">
  .payout-info
    span.payout-info__header Выплата фиксированного ежегодного дохода

    .payout-info__content
      .payout-info__list
        .payout-info__item(v-for="(item, idx) of term")
          .payout-info__item-fee
            span.payout-info__text {{ idx + 1 }}-й взнос

            span.payout-info__price {{ formatPrice(baseSum) }}

          .payout-info__item-pay
            span.payout-info__text выплата

            span.payout-info__price {{ payoutSum(idx + 1) }}

      .payout-info__result
        svgicon(icon="money")

        .payout-info__result-info
          span.payout-info__price.payout-info__price_total + {{ totalSum }}

          span.payout-info__text все ваши взносы за 5 лет

</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'PayoutInfo',

  props: {
    baseSum: {
      type: Number,
      required: true,
    },
    term: {
      type: Number,
      required: true,
    },
  },
});

</script>

<style lang="sass">
.payout-info
  width: 100%
  margin-bottom: 40px
  font-family: $second-font-stack

  &__header
    display: block
    margin-bottom: 16px
    color: $black
    font-size: 20px
    font-weight: normal
    line-height: 24px
    letter-spacing: -0.01em

  &__content
    display: flex
    align-items: flex-end
    justify-content: space-between
    flex-direction: column

    +for-tablet-middle-landscape-up
      flex-direction: row

  &__text
    margin-bottom: 4px
    font-weight: 300
    font-size: 14px
    line-height: 18px
    letter-spacing: -0.02em

  &__price
    font-weight: 400
    font-size: 15px
    line-height: 18px
    letter-spacing: -0.03em
    white-space: nowrap

    +for-mobile-up
      font-size: 16px
      line-height: 20px

    +for-tablet-portrait-up
      font-size: 20px
      line-height: 24px

    +for-tablet-middle-landscape-up
      font-size: 16px
      line-height: 20px

    &_total
      font-size: 18px
      line-height: 22px

      +for-tablet-portrait-up
        font-size: 20px
        line-height: 24px

      +for-tablet-middle-landscape-up
        font-size: 18px
        line-height: 22px

  &__list
    display: flex
    flex-direction: column
    width: 100%

    +for-tablet-middle-landscape-up
      flex-direction: row
      width: calc(100% - 145px)
      margin: 0 0 0 -8px

  &__item
    display: flex
    justify-content: space-between
    width: 100%
    margin-bottom: 24px

    +for-tablet-middle-landscape-up
      display: block
      width: calc(100% / 5 - 16px)
      max-width: 112px
      margin: 0 8px

    @for $i from 1 to 5
      &:nth-child(#{$i+1}n)
        .payout-info__item-fee
          margin-left: #{$i * 8}px

          +for-mobile-up
            margin-left: #{$i * 12}px

          +for-tablet-middle-landscape-up
            width: 100%
            margin-left: 0

          &:after
            width: calc(56% - 16px - #{$i * 8}px)

            +for-mobile-up
              width: calc(118% - 16px - #{$i * 12}px)

            +for-tablet-portrait-up
              width: calc(100% - #{$i * 12}px - 16px)

        +for-tablet-middle-landscape-up
          margin-top: #{$i * 12}px

  &__item-fee,
  &__item-pay
    display: flex
    flex-direction: column
    padding: 10px 12px
    border-radius: 4px

    +for-mobile-up
      padding: 12px 16px

    +for-tablet-middle-landscape-up
      margin: 8px 0
      padding: 8px 12px

  &__item-fee
    position: relative
    width: 38%
    background: $color-black-squeeze
    color: $black

    +for-mobile-up
      width: 30%

    +for-tablet-middle-landscape-up
      width: 100%
      margin-bottom: 32px

    .payout-info__price
      font-size: 15px

      +for-mobile-up
        font-size: 16px

    &:after
      content: ''
      position: absolute
      bottom: 50%
      right: -8px

      width: calc(56% - 16px)
      height: 8px
      transform: translate(100%, 50%)
      background-image: url('../../assets/images/arrow-right-step.svg')
      background-position: right center
      background-repeat: no-repeat

      +for-mobile-up
        width: calc(118% - 16px)

      +for-tablet-portrait-up
        width: calc(100% - 16px)

      +for-tablet-middle-landscape-up
        bottom: -12px
        left: 50%
        right: auto
        width: 8px
        height: 13px
        transform: translate(-50%, 100%)
        background-image: url('../../assets/images/arrow-down-step.svg')
        background-position: center

  &__item-pay
    width: 42%
    background: $second-color-dark
    color: $color-white

    +for-mobile-up
      width: 35%

    +for-tablet-portrait-up
      width: 40%

    +for-tablet-middle-landscape-up
      width: 100%

    .payout-info__text
      font-size: 12px

  &__result
    display: flex
    flex-direction: row
    justify-content: space-between
    width: calc(100% - 32px)
    padding: 16px
    margin: 4px 0
    border-radius: 4px
    background: $second-color-dark
    color: $color-white

    +for-mobile-up
      width: calc(100% - 48px)

    +for-tablet-middle-landscape-up
      flex-direction: column
      justify-content: space-between
      width: 145px
      min-height: 154px

    &-info
      display: flex
      flex-direction: column
      order: 1

      +for-tablet-middle-landscape-up
        order: 2

    svg
      order: 2
      max-width: 44px

      +for-tablet-middle-landscape-up
        order: 1

</style>
