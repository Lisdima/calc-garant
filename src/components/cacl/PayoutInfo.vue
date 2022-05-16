<template lang="pug">
  .payout-info
    .payout-info__content
      .payout-info__list
        .payout-info__item(v-for="(item, idx) of term")
          .payout-info__item-fee
            span.payout-info__item-fee--text {{ idx + 1 }}-й взнос

            span.payout-info__price {{ formatPrice(sum) }}

          .payout-info__item-pay
            .payout-info__block-text
              span.payout-info__text выплата
              span.payout-info__percent {{payoutPercent(idx + 1)}}

            span.payout-info__price {{ payoutSum(idx + 1) }}

      .payout-info__result
        .payout-info__result-img
          img(src="../../assets/images/money.svg")
        .payout-info__result-info
          span.payout-info__result-text все взносы
          span.payout-info__price.payout-info__price_total + {{ totalSum }}

</template>

<script>
import Vue from 'vue';
import { addSpacesOnInput } from '@/helpers/formatString';

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
    sum: {
      type: Number,
    },
  },
  computed: {
    totalSum() {
      return this.formatPrice(Math.floor(this.sum * 0.28) + Math.floor(this.sum * 0.2) + Math.floor(this.sum * 0.3));
    },
  },
  methods: {
    formatPrice(value) {
      return `${addSpacesOnInput(value.toString())} ₽`;
    },
    payoutSum(term) {
      if (term === 1) {
        const sumFirstYear = Math.floor(this.sum * 0.28);
        return this.formatPrice(sumFirstYear);
      }
      if (term === 2) {
        const sumSecondYear = Math.floor(this.sum * 0.2);
        return this.formatPrice(sumSecondYear);
      }
      const sumThirdYear = Math.floor(this.sum * 0.3);
      return this.formatPrice(sumThirdYear);
    },
    payoutPercent(term) {
      if (term === 1) {
        return '28%';
      }
      if (term === 2) {
        return '20%';
      }
      return '30%';
    },
  },
});
</script>

<style lang="sass">
.payout-info
  width: 100%
  font-family: $second-font-stack
  margin-top: 20px

  &__content
    display: flex
    align-items: flex-start
    justify-content: space-between
    flex-direction: row
    @media (max-width: $my-tablet-small-land)
      flex-direction: column

  &__block-text
    font-weight: 300
    font-size: 12px
    line-height: 14px
    margin-bottom: 5px
    letter-spacing: -0.02em

  &__percent
    font-weight: 400
    background: #FFFFFF
    border-radius: 24px
    color: #28323C
    padding: 0px 4px
    margin-left: 4px
  &__price
    font-weight: 400
    font-size: 15px
    line-height: 18px
    letter-spacing: -0.03em
    white-space: nowrap

    &_total
      font-size: 18px
      line-height: 22px

  &__list
    display: flex
    width: 100%
    flex-direction: row
    @media (max-width: $my-tablet-small-land)
      justify-content: space-between
      flex-direction: column

  &__item
    display: flex
    justify-content: space-between
    width: 100%
    flex-direction: column
    margin-right: 33px
    @media (max-width: $my-tablet-land)
      margin-right: 8px
    @media (max-width: $my-tablet-small-land)
      margin-right: 0
      flex-direction: row

  &__item-fee,
  &__item-pay
    display: flex
    flex-direction: column
    padding: 10px 12px
    border-radius: 4px
    @media (max-width: $my-tablet-small-land)
      padding: 8px 55px
      margin-bottom: 16px
    @media (max-width: $my-mobile)
      padding: 8px 0
      text-align: center

  &__item-fee
    position: relative
    width: 100%
    background: $color-black-squeeze
    color: $black
    margin-bottom: 32px
    @media (max-width: $my-tablet-small-land)
      margin-right: 48px

    .payout-info__price
      font-size: 16px
      line-height: 22px

      +for-mobile-up
        font-size: 16px

    &:after
      content: ''
      position: absolute
      bottom: -12px
      left: 50%
      right: auto
      width: 8px
      height: 13px
      transform: translate(-50%, 100%)
      background-image: url('../../assets/images/arrow-down-step.svg')
      background-position: center
      @media (max-width: $my-tablet-small-land)
        bottom: 50%
        left: 100%
        width: 12px
        height: 8px
        transform: translate(100%, 50%)
        background-image: url('../../assets/images/arrow-right-step.svg')
        background-position: 100%

  &__item-pay
    width: 100%
    background: linear-gradient(180deg, #B589E7 0%, #8563BF 44.84%, #503988 100%)
    box-shadow: 0px 23px 25px rgba(10, 60, 106, 0.03), 0px 11px 15px rgba(10, 35, 124, 0.05)
    color: $color-white
    @media (max-width: $my-tablet-small-land)
      height: fit-content

    .payout-info__text
      font-size: 12px

    .payout-info__price
      font-size: 16px
      line-height: 22px

  &__result-text, &__item-fee--text
    margin-bottom: 4px

  &__result
    display: flex
    flex-direction: column
    justify-content: space-between
    padding: 8px 12px
    border-radius: 4px
    height: 154px
    background: $second-color-dark
    color: $color-white
    background: linear-gradient(180deg, #B589E7 0%, #8563BF 44.84%, #503988 100%)
    box-shadow: 0px 23px 25px rgba(10, 60, 106, 0.03), 0px 11px 15px rgba(10, 35, 124, 0.05)
    @media (max-width: $my-tablet-small-land)
      width: 100%
      flex-direction: row
      height: auto
      padding: 8px 28px 8px 40px

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
