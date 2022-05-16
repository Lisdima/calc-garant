<template lang="pug">
  .home(v-loading="isLoading")
    Keyvisual

    .home__info-program-list
      .home__info-program-item(v-for="(item, idx) of infoProgram" :key="idx")
        .home__info-program-value {{ item.value }}

        .home__info-program-desc {{ item.description }}

    el-form(
      :model="form"
      :rules="rules"
      ref="form"
      label-position="top"
    )
      .home__slider-wrapper
        .home__slider-input
          .home__label Ежегодный взнос

          SliderInput(
            :baseSum="form.sum"
            :term="form.term"
            :minValue="minValue"
            :maxValue="maxValue"
            @updateBaseSum="onUpdateFormSum"
          )

      PayoutInfo(:baseSum="form.sum" :term="form.term")

      .home__info-contract
        .home__info-contract-item.home__info-contract-item_payout
          .home__info-contract-heading
            span.home__info-contract-name Первая выплата уже через 9 месяцев

            svgicon(icon="lightning")

          p.home__info-contract-desc.home__info-contract-desc_light-gray
            | Доходность выплачивается через 9 месяцев после каждого взноса, а не через год

        .home__info-contract-item.home__info-contract-item_deduction
          p.home__info-contract-desc Можно больше

          p.home__info-contract-name + до 78 000 ₽ за 5 лет

          p.home__info-contract-desc.home__info-contract-desc_light-gray
            | Данная программа позволяет вернуть вам до 78 000 ₽ подоходного налога за 5 лет.
            | Налоговый вычет — это 13% от суммы взноса, но не более 15 600 ₽ в год

      .home__detailed-calculation(v-if="policy")
        span.home__header Подробный расчёт

          span.home__header_link(@click="isRisksVisible = !isRisksVisible")
            | {{ isRisksVisible ? 'скрыть' : 'показать'}}

        Risks(
          v-if="isRisksVisible"
          :infoList="riskList"
          :policyFee="policyFee"
        )

      .home__agent-checkbox(v-if="config.VUE_APP_CHECKBOX_WITHOUT_AGENT === '1'")
        el-checkbox(v-model="form.isNoAgentNumber" @change="onChangeIsNoAgentNumber") Без агента

      .home__button-wrapper
        el-form-item(
          v-if="!form.isNoAgentNumber"
          label="номер агента"
          prop="agentNumber"
        )
          el-input(
            v-model="form.agentNumber"
            v-inputmask="'9{5}'"
            :readonly="form.isAgentNumberFromUrl"
          )

        el-button(
          :disabled="isDisabledButton"
          :loading="isLoadingButton"
          type="info"
          @click="onValidateForm"
        ) к оформлению

</template>

<script lang="ts">
import Vue from 'vue';

import SliderInput from './SliderInput.vue';
import PayoutInfo from './PayoutInfo.vue';

const infoProgram = [
  { value: 'на 5 лет', description: 'срок программы' },
  { value: 'от 200 000 ₽', description: 'взнос' },
  { value: 'раз в год', description: 'периодичность оплаты' },
  { value: 'от 18 до 88 лет', description: 'на момент окончания срока \nдействия договора \nстрахования' },
];

export default Vue.extend({
  name: 'Home',

  components: {
    SliderInput,
    PayoutInfo,
  },

  data() {
    return {
      infoProgram,
      isLoading: false,
      isLoadingButton: false,
      isRisksVisible: true,
      form: {
        isNoAgentNumber: false,
        isAgentNumberFromUrl: false,
        agentNumber: '',
        sum: 100000,
        term: 5,
      },
      minValue: 100000,
      maxValue: 5000000,
    };
  },
});
</script>

<style lang="sass">
.home
  @extend %inner
  padding: 20px 16px

  font-family: $second-font-stack

  +for-tablet-middle-landscape-up
    padding: 40px 15px

  &__header,
  &__info-program-value
    display: block
    margin-bottom: 4px
    color: $black
    font-size: 20px
    font-weight: normal
    line-height: 24px
    letter-spacing: -0.01em

  &__info-program-value
    font-size: 14px
    line-height: 18px
    white-space: nowrap

    +for-tablet-portrait-up
      font-size: 16px
      line-height: 20px

    +for-tablet-middle-landscape-up
      font-size: 18px
      line-height: 22px

    +for-tablet-landscape-up
      font-size: 20px
      line-height: 24px

  &__header
    margin-bottom: 16px

    &_link
      margin-left: 8px
      color: $link-color
      cursor: pointer

  &__info-program-list
    display: flex
    flex-wrap: wrap
    justify-content: flex-start
    margin-bottom: 16px
    padding-bottom: 0
    border-bottom: 1px solid $color-geyser

    +for-tablet-middle-landscape-up
      flex-wrap: nowrap
      justify-content: space-between
      margin-bottom: 40px
      padding-bottom: 16px

  &__info-program-item
    width: calc(100% / 2)
    padding: 0 16px 16px 0

    +for-tablet-middle-landscape-up
      width: auto
      padding: 0 24px 24px 0

    &:last-child
      padding-right: 0

  &__info-program-desc
    color: $color-regent-gray
    font-size: 12px
    font-weight: 300
    line-height: 16px
    letter-spacing: -0.01em
    white-space: pre-wrap

    +for-tablet-portrait-up
      font-size: 14px
      line-height: 18px

    +for-tablet-middle-landscape-up
      font-size: 16px
      line-height: 20px

  &__slider-wrapper
    display: flex
    flex-direction: column
    margin-bottom: 16px

    +for-tablet-middle-landscape-up
      flex-direction: row
      margin-bottom: 40px

  &__slider-input
    order: 2
    width: 100%
    margin-right: 0

    +for-tablet-middle-landscape-up
      order: 1
      width: 358px
      margin-right: 24px

  &__label
    margin-bottom: 4px
    color: $color-regent-gray
    font-size: 14px
    font-weight: 300
    line-height: 18px
    letter-spacing: -0.01em

  &__info-contract
    display: flex
    flex-wrap: wrap
    justify-content: space-between
    margin-bottom: 40px

  &__info-contract-item
    padding: 16px
    border-radius: 4px

    &_payout
      order: 2
      width: 100%
      background: $color-black-squeeze

      +for-tablet-middle-landscape-up
        order: 1
        width: 288px

    &_deduction
      order: 1
      width: 100%
      margin-bottom: 16px
      border: 0.5px solid $color-geyser

      +for-tablet-middle-landscape-up
        order: 2
        width: calc(100% - 288px - 40px)
        margin-bottom: 0

  &__info-contract-heading
    display: flex

    .home__info-contract-name
      width: calc(100% - 38px)
      margin-right: 16px

      +for-tablet-portrait-up
        width: calc(100% - 46px)
        margin-right: 24px

    svg
      width: 21px

  &__info-contract-name
    margin-bottom: 8px
    font-size: 20px
    line-height: 24px
    font-weight: 400
    letter-spacing: -0.01em
    font-family: $second-font-stack
    font-style: normal
    color: $black

  &__info-contract-desc
    margin-bottom: 8px
    font-size: 14px
    line-height: 18px
    font-weight: 300
    letter-spacing: -0.01em
    font-family: $second-font-stack
    font-style: normal
    color: $black

    &:last-of-type
      margin-bottom: 0

    &_light-gray
      color: $gray-dark

  &__detailed-calculation
    margin-bottom: 40px

    .home__header
      margin-bottom: 18px

  &__agent-checkbox
    margin-bottom: 20px

  &__button-wrapper
    display: flex
    align-items: flex-end

    .el-form-item
      width: 95px
      margin-right: 16px
      margin-bottom: 16px

      +for-tablet-middle-landscape-up
        margin-bottom: 40px

      &__label
        color: $black
        font-weight: 300

      &__content
        height: 40px

      .el-input__inner
        line-height: 38px

      &__error
        font-size: 11px

    .el-input__inner,
    .el-button
      height: 40px
      border-radius: 1px

    .el-button
      display: flex
      align-items: center
      margin-bottom: 16px
      padding: 10px 16px
      line-height: 20px

      +for-tablet-middle-landscape-up
        margin-bottom: 40px
        padding: 10px 24px

  &__terms-text
    position: relative
    top: -5px
    margin-bottom: 25px
    color: $color-regent-gray
    font-size: 14px
    font-weight: 300
    line-height: 18px
    letter-spacing: -0.01em
</style>
