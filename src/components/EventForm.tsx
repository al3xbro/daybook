type Props = {
    change: Function
}

function defaultStartTime() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().substring(0, 16)
}

function defaultEndTime() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset() + 60)
    return date.toISOString().substring(0, 16)
}

export default function EventForm({ change }: Props) {
    return (
        <div className="self-center w-4/5">
            <form onSubmit={() => change(0)} className="flex flex-col gap-5 w-full">
                <div>
                    <div className="text-right">title</div>
                    <input type="text" id="title" className="w-full" />
                </div>
                <div>
                    <div className="text-right">start time</div>
                    <input type="datetime-local" id="startTime" className="w-full" value={defaultStartTime()} />
                </div>
                <div>
                    <div className="text-right">end time</div>
                    <input type="datetime-local" id="endTime" className="w-full" value={defaultEndTime()} />
                </div>
                <div>
                    <div className="text-right">notes</div>
                    <textarea id="notes" className="w-full"></textarea>
                </div>
                <input type="submit" className="ui-button" />
            </form>
        </div>
    )
}