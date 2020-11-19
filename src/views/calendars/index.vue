<template>
    <div class="calendars">
        <!-- usage -->
        <div>
            <v-sheet tile
                     height="54"
                     class="d-flex"
            >
                <v-btn icon
                       class="ma-2"
                       @click="$refs.calendar.prev()"
                >
                    <v-icon>mdi-chevron-left</v-icon>
                </v-btn>

                <v-select v-model="type"
                          :items="types"
                          dense
                          outlined
                          hide-details
                          class="ma-2"
                          label="type"
                ></v-select>

                <v-select v-model="mode"
                          :items="modes"
                          dense
                          outlined
                          hide-details
                          label="event-overlap-mode"
                          class="ma-2"
                ></v-select>

                <v-select v-model="weekday"
                          :items="weekdays"
                          dense
                          outlined
                          hide-details
                          label="weekdays"
                          class="ma-2"
                ></v-select>

                <v-spacer></v-spacer>

                <v-btn icon
                       class="ma-2"
                       @click="$refs.calendar.next()"
                >
                    <v-icon>mdi-chevron-right</v-icon>
                </v-btn>
            </v-sheet>

            <v-sheet height="600">
                <v-calendar ref="calendar"
                            v-model="value"
                            :weekdays="weekday"
                            :type="type"
                            :events="events"
                            :event-overlap-mode="mode"
                            :event-overlap-threshold="30"
                            :event-color="getEventColor"
                            @change="getEvents"
                ></v-calendar>
            </v-sheet>
        </div>

        <!-- Day body -->
        <div>
            <v-row>
                <v-col>
                    <v-sheet height="500">
                        <v-calendar ref="calendar"
                                    v-model="value"
                                    type="week"
                        >
                            <template v-slot:day-body="{ date, week }">
                                <div class="v-current-time"
                                     :class="{ first: date === week[ 0 ].data }"
                                     :style="{ top: nowY }"
                                ></div>
                            </template>
                        </v-calendar>
                    </v-sheet>
                </v-col>
            </v-row>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'calendars',

        data: () => ( {
            // usage -> start
            type    : 'month',
            types   : [
                'month',
                'week',
                'day',
                '4day',
            ],
            mode    : 'stack',
            modes   : [
                'stack',
                'column',
            ],
            weekday : [
                0,
                1,
                2,
                3,
                4,
                5,
                6,
            ],
            weekdays: [
                {
                    text : 'Sun - Sat',
                    value: [
                        0,
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                    ],
                },
                {
                    text : 'Mon - Sun',
                    value: [
                        1,
                        2,
                        3,
                        4,
                        5,
                        6,
                        0,
                    ],
                },
                {
                    text : 'Mon - Fri',
                    value: [
                        1,
                        2,
                        3,
                        4,
                        5,
                    ],
                },
                {
                    text : 'Mon, Wed, Fri',
                    value: [
                        1,
                        3,
                        5,
                    ],
                },
            ],
            // value   : '',
            events  : [],
            colors  : [
                'blue',
                'indigo',
                'deep-purple',
                'cyan',
                'green',
                'orange',
                'grey darken-1',
            ],
            names   : [
                'Meeting',
                'Holiday',
                'PTO',
                'Travel',
                'Event',
                'Birthday',
                'Conference',
                'Party',
            ],
            // usage -> end

            // Day body -> start
            value: '',
            ready: false,
            // Day body -> end
        } ),

        computed: {
            // Day body -> start
            cal()
            {
                return this.ready ? this.$refs.calendar : null;
            },

            nowY()
            {
                return this.cal ? this.cal
                                      .timeToY( this.cal.times.now ) + 'px'
                                : '-10px';
            },
            // Day body -> end
        },

        mounted()
        {
            // Day body -> start
            this.ready = true;

            this.scrollToTime();

            this.updateTime();
            // Day body -> end
        },

        methods: {
            // usage -> start
            getEvents( { start, end, } )
            {
                const events = [];

                const min        = new Date( `${ start.date }T00:00:00` );
                const max        = new Date( `${ end.date }T23:59:59` );
                const days       = ( max.getTime() - min.getTime() ) / 8640000;
                const eventCount = this.rnd( days, days + 20 );

                for ( let i = 0; i < eventCount; i++ )
                {
                    const allDay          = this.rnd( 0, 3 ) === 0;
                    const firstTimestamp  = this.rnd( min.getTime(), max.getTime() );
                    const first           = new Date( firstTimestamp - ( firstTimestamp % 900000 ) );
                    const secondTimestamp = this.rnd( 2, allDay ? 288 : 8 ) * 900000;
                    const second          = new Date( first.getTime() + secondTimestamp );

                    events.push( {
                        name : this.names[ this.rnd( 0, this.names.length - 1 ) ],
                        start: first,
                        end  : second,
                        color: this.colors[ this.rnd( 0, this.colors.length - 1 ) ],
                        timed: !allDay,
                    } );
                }

                this.events = events;
            },

            getEventColor( event )
            {
                return event.color;
            },

            rnd( a, b )
            {
                return Math.floor( ( b - a + 1 ) * Math.random() ) + a;
            },
            // usage -> end

            // Day -> start
            getCurrentTime ()
            {
                return this.cal ? this.cal.times.now.hour * 60 + this.cal.times.now.minute : 0;
            },

            scrollToTime ()
            {
                const time = this.getCurrentTime();
                const first = Math.max( 0, time - ( time % 30 ) - 30 );

                this.cal.scrollToTime( first );
            },

            updateTime ()
            {
                setInterval( () => this.cal.updateTimes(), 60 * 1000 );
            },
            // Day -> end
        },
    };
</script>

<style lang="scss"
       scoped
>
    @import "style";
</style>

<style lang="scss">
    .v-current-time {
        height: 2px;
        background-color: #ea4335;
        position: absolute;
        left: -1px;
        right: 0;
        pointer-events: none;

        &.first::before {
            content: '';
            position: absolute;
            background-color: #ea4335;
            width: 12px;
            height: 12px;
            border-radius: 50%;
            margin-top: -5px;
            margin-left: -6.5px;
        }
    }
</style>
