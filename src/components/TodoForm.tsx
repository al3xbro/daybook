"use client"

type Props = {
    change: Function
}

function defaultEndTime() {
    const date = new Date()
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset() + 60)
    return date.toISOString().substring(0, 16)
}

export default function Todoform({ change }: Props) {
    return (
        <div className="self-center w-4/5">
            <form onSubmit={() => change(0)} className="flex flex-col gap-5 w-full">
                <div>
                    <div className="text-right">title</div>
                    <input type="text" id="title" className="w-full p-1 rounded-md" />
                </div>
                <div>
                    <div className="text-right">deadline</div>
                    <input type="datetime-local" id="startTime" className="w-full p-1 rounded-md" value={defaultEndTime()} />
                </div>
                <div>
                    <div className="text-right">notes</div>
                    <textarea id="notes" className="w-full p-1 rounded-md"></textarea>
                </div>
                <div className="flex flex-row gap-3">
                    <input type="submit" className="ui-button flex-1 bg-blue-200" />
                    <button className="ui-button flex-1" onClick={() => change(0)}>Cancel</button>
                </div>
            </form>
        </div>
    )
}