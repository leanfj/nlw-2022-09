import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';

interface Item {
  id: string
  title: string
}

interface SelectBoxProps {
  data: Item[],
  getGame: (data: any) => void
}

export function SelectBox({ data, getGame }: SelectBoxProps) {
  return (
    <Select.Root onValueChange={(data) => getGame(data)}>
      <Select.Trigger className='bg-zinc-900 py-3 px-4 h-11 rounded text-sm text-white inline-flex items-center justify-between' >
        <Select.Value placeholder="Selecione o game que deseja jogar" className='text-zinc-500' />
        <Select.Icon className='text-zinc-500'>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal >
        <Select.Content className='bg-zinc-800 rounded-md text-white '>
          <Select.ScrollUpButton>
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className=''>

            {data.map((item: Item) => {
              return (
                <Select.Item value={item.id} key={item.id} itemID={item.id} className="  mx-1 rounded flex items-center justify-between h-10 pl-6 pr-9 select-none [&[data-highlighted]]:bg-violet-500 group" >
                  <Select.ItemText className='DEBUG'> {item.title}</Select.ItemText>
                  <Select.ItemIndicator className='text-violet-500 group-hover:text-white '><CheckIcon /></Select.ItemIndicator>
                </Select.Item>
              )
            })
            }
          </Select.Viewport>
          <Select.ScrollDownButton />
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}