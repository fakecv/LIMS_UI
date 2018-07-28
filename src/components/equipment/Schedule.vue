<template>
<div id="vueapp" class="vue-app">
    <kendo-scheduler :data-source="localDataSource"
                     :date="date"
                     :height="600"
                     :timezone="'Etc/UTC'"
                     @change="onChange"
                     @edit="onEdit"
                     @add="onAdd"
                     @cancel="onCancel"
                     @dataBound="onDataBound"
                     @move="onMove"
                     @navigate="onNavigate"
                     @resize="onResize"
                     @save="onSave">
      <kendo-scheduler-view :type="'day'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'workWeek'" :selected="true"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'week'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'month'"></kendo-scheduler-view>
      <kendo-scheduler-view :type="'agenda'"></kendo-scheduler-view>
    </kendo-scheduler>
    <full-calendar class="test-fc" :events="fcEvents"
      first-day='1' locale="fr"
      @changeMonth="changeMonth"
      @eventClick="eventClick"
      @dayClick="dayClick"
      @moreClick="moreClick">
        <template slot="fc-event-card" slot-scope="p">
            <p><i class="fa"></i> -{{ p.event.title }}- </p>
        </template>
    </full-calendar>
</div>
</template>

<script>
let demoEvents = [
  {
    title: 'Sunny 725-727',
    start: '2017-02-25',
    end: '2017-02-27',
    cssClass: 'family'
  },
  {
    title: 'Lunfel 726-727',
    start: '2017-02-26',
    end: '2017-02-27',
    cssClass: ['home', 'work']
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/27-2/28',
    start: '2017-02-27',
    end: '2017-02-28'
  },
  {
    title: 'Lunfel 2/26-3/05',
    start: '2017-02-26',
    end: '2017-03-05'
  },
  {
    title: 'Lunfel 1/27-1/28',
    start: '2017-01-27',
    end: '2017-01-28'
  },
  {
    title: 'Lunfel 1/27-2/2',
    start: '2017-01-27',
    end: '2017-02-02'
  },
  {
    title: 'Lunfel 3/27-3/28',
    start: '2017-03-27',
    end: '2017-03-28'
  },
  {
    title: 'Lunfel 5/18-5/29',
    start: '2017-05-18T23:55:00-04:00',
    end: '2017-05-29T01:15:00-04:00'
  },
  {
    title: 'Overlap1',
    start: '2017-11-02T06:55:00-04:00',
    end: '2017-11-03T14:55:00-04:00'
  },
  {
    title: 'Overlap2',
    start: '2017-11-02T06:55:00-04:00',
    end: '2017-11-04T14:55:00-04:00'
  },
  {
    title: 'Overlap3',
    start: '2017-11-03T06:55:00-04:00',
    end: '2017-11-04T14:55:00-04:00'
  }
]
export default {
  name: 'schedule',
  data () {
    return {
      name: 'Sunny!',
      fcEvents: demoEvents,
      date: new Date('2013/6/6'),
      localDataSource: [
        {
          id: 1,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Interview',
          recurrenceRule: 'FREQ=WEEKLY;BYDAY=TU,TH',
          recurrenceException: new Date('2013/6/11 09:00 AM')
        },
        {
          id: 2,
          start: new Date('2013/6/6 08:00 AM'),
          end: new Date('2013/6/6 09:00 AM'),
          title: 'Meeting'
        }
      ],
      startTime: new Date('2013/6/13 07:00 AM'),
      fields: {
        taskId: { from: 'TaskID', type: 'number' },
        title: { from: 'Title', defaultValue: 'No title', validation: { required: true } },
        start: { type: 'date', from: 'Start' },
        end: { type: 'date', from: 'End' },
        startTimezone: { from: 'StartTimezone' },
        endTimezone: { from: 'EndTimezone' },
        description: { from: 'Description' },
        recurrenceId: { from: 'RecurrenceID' },
        recurrenceRule: { from: 'RecurrenceRule' },
        recurrenceException: { from: 'RecurrenceException' },
        isAllDay: { type: 'boolean', from: 'IsAllDay' }
      }
    }
  },
  methods: {
    'changeMonth' (start, end, current) {
      console.log('changeMonth', start.format(), end.format(), current.format())
    },

    'eventClick' (event, jsEvent, pos) {
      console.log('eventClick', event, jsEvent, pos)
    },

    'dayClick' (day, jsEvent) {
      console.log('dayClick', day, jsEvent)
    },

    'moreClick' (day, events, jsEvent) {
      console.log('moreCLick', day, events, jsEvent)
    },
    onChange: function (ev) {
      console.log('Event :: change')
    },
    onEdit: function (ev) {
      console.log('Event :: edit')
    },
    onAdd: function (ev) {
      console.log('Event :: add')
    },
    onCancel: function (ev) {
      console.log('Event :: cancel')
    },
    onDataBound: function (ev) {
      console.log('Event :: dataBound')
    },
    onMove: function (ev) {
      console.log('Event :: move')
    },
    onNavigate: function (ev) {
      console.log('Event :: navigate')
    },
    onResize: function (ev) {
      console.log('Event :: resize')
    },
    onSave: function (ev) {
      console.log('Event :: save')
      console.log(this.localDataSource)
    }

  }

}
</script>

<style scoped>

</style>
