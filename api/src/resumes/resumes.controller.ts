import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ResumesService } from './resumes.service';
import { CreateResumeDto } from './dto/create-resume.dto';
import { UpdateResumeDto } from './dto/update-resume.dto';
import { Sorting } from 'src/shared/types/request.types';
import { Resume } from './entities/resume.entity';
interface ValidIntInRangeParams {
  value?: string;
  min: number;
  max: number;
  fallback: number;
}

@Controller('resumes')
export class ResumesController {
  constructor(private readonly resumesService: ResumesService) { }

  private getValidIntInRange = ({ value, min, max, fallback = 0 }: ValidIntInRangeParams) => {
    if (value === undefined || isNaN(+value)) {
      return fallback;
    }

    if (+value < min) {
      return min;
    }

    if (~~+value > max) {
      return max;
    }

    return ~~+value;
  };

  private extractSorting = (sortQuery?: string) => {
    const re = /((\w|\d)+),((a|de)sc)(?=;?)/g;
    const matches = sortQuery?.match(re) ?? [];

    if (!matches.length) {
      return undefined;
    }

    const sorting: Sorting<Resume> = {};

    for (const match of matches) {
      const [column, dir] = match.split(/,/g) as [keyof Resume, 'asc' | 'desc'];

      sorting[column] = dir;
    }

    return sorting;
  };

  @Post()
  create(@Body() createResumeDto: CreateResumeDto) {
    return this.resumesService.create(createResumeDto);
  }

  @Get()
  findAll(
    @Query('limit') limitQuery?: string,
    @Query('offset') offsetQuery?: string,
    @Query('sort') sortQuery?: string
  ) {
    const limit = this.getValidIntInRange({
      value: limitQuery,
      min: 1,
      max: Infinity,
      fallback: 25
    });
    const offset = this.getValidIntInRange({
      value: offsetQuery,
      min: 0,
      max: Infinity,
      fallback: 0
    });

    return this.resumesService.list({
      paging: {
        limit,
        offset
      },
      sorting: this.extractSorting(sortQuery)
    });
  }

  @Patch('/remove')
  removeMany(@Body() payload: { ids: number[]; }) {
    return this.resumesService.removeMany(payload.ids);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.resumesService.findOne({
      id: +id
    });
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResumeDto: UpdateResumeDto) {
    return this.resumesService.update(+id, updateResumeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.resumesService.remove(+id);
  }
}
