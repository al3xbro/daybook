type Props = {
    change: Function
}

export default function Todoform({ change }: Props) {
    return (
        <div className="self-center w-4/5">
            <form onSubmit={() => change(0)} className="flex flex-col gap-5 w-full">
                <div>
                    <div className="text-right">title</div>
                    <input type="text" id="title" className="w-full" />
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