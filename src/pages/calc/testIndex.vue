<template lang="pug">
section(v-loading="isLoading")
  .calculation-form
    .calculation-block
      .calculation-block__title Ежегодный взнос
      SliderInput(
          :minValue="minValue"
          :maxValue="maxValue"
          :term="term"
          :baseSum="baseSum"
          @updateBaseSum="onUpdateFormSum"
      )
      el-button.el-button--action.calculation-block__button(v-if="width > 790" @click="orderUrl($event)") Оформить
    .information-block
      .information-block__title Выплата фиксированного ежегодного дохода
      PayoutInfo(
        :term="term"
        :baseSum="baseSum"
        :sum="sum"
        )
    el-button.el-button--action.calculation-block__button(v-if="width < 791" @click="orderUrl($event)") Оформить
</template>

<script>
import SliderInput from '../../components/cacl/SliderInput.vue';
import PayoutInfo from '../../components/cacl/PayoutInfo.vue';

export default {
  name: 'Calc',
  components: {
    SliderInput,
    PayoutInfo,
  },
  data() {
    return {
      isLoading: false,
      minValue: 100000,
      maxValue: 5000000,
      term: 3,
      sum: 100000,
      baseSum: 100000,
      width: null,
    };
  },
  created() {
    window.addEventListener('resize', this.updateWidth);
    this.updateWidth();
  },
  methods: {
    onUpdateFormSum(sum) {
      this.isLoading = true;
      this.sum = Number(sum);
      setTimeout(() => {
        this.isLoading = false;
      }, 500);
    },
    updateWidth() {
      this.width = window.innerWidth;
    },
    orderUrl(e) {
      window.location.href = `https://order.renlife.ru/policy/?programBrief=NSZH_FINANCIAL_RENT_DSF_3YEAR&sum=${this.sum}${window.location.search.replace('?', '&')}`;
      e.target.blur();
      return window.location.href;
    },
  },
};
</script>

<style lang="sass">
.calculation-form
  display: flex
  justify-content: space-between
  @media (max-width: $my-tablet-small-land)
    flex-direction: column
    align-items: center
  .calculation-block
    width: 410px
    @media (max-width: $my-desc)
      width: 380px
    @media (max-width: $my-tablet-land)
      width: 320px
    @media (max-width: $my-tablet-small-land)
      width: 320px
      margin-bottom: 30px
    &__title
      margin-bottom: 20px
    &__button
      width: 200px
      margin-top: 38px
      @media (max-width: $my-tablet-small-land)
        margin-top: 24px
        width: 100%
  .information-block
    @media (max-width: $my-mobile)
      width: 100%
</style>
